import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateFuelSupplyDto } from './dto/create-fuel-supply.dto';
import { UpdateFuelSupplyDto } from './dto/update-fuel-supply.dto';

@Injectable()
export class FuelSuppliesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateFuelSupplyDto) {
    console.log('\n================ FUEL CREATE ================');

    console.log('USER ID =>', userId);
    console.log('DTO =>', dto);

    /*
      VALIDATE VEHICLE
    */
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: dto.vehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    /*
      VALIDATE ACCOUNT
    */
    const account = await this.prisma.account.findFirst({
      where: {
        id: dto.accountId,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    /*
      VALIDATE CATEGORY
    */
    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    /*
      CALCULATIONS
    */
    let liters = dto.liters;
    let totalAmount = dto.totalAmount;

    const hasLiters = liters !== undefined;

    const hasTotalAmount = totalAmount !== undefined;

    /*
      AUTO CALCULATE LITERS
    */
    if (!hasLiters && hasTotalAmount) {
      liters = totalAmount! / dto.pricePerLiter;

      console.log('LITERS AUTO CALCULATED =>', liters);
    }

    /*
      AUTO CALCULATE TOTAL
    */
    if (!hasTotalAmount && hasLiters) {
      totalAmount = liters! * dto.pricePerLiter;

      console.log('TOTAL AUTO CALCULATED =>', totalAmount);
    }

    /*
      FINAL VALIDATION
    */
    if (liters === undefined || totalAmount === undefined) {
      throw new BadRequestException('You must provide liters or totalAmount');
    }

    /*
      ROUND VALUES
    */
    liters = Number(liters.toFixed(2));

    totalAmount = Number(totalAmount.toFixed(2));

    /*
      AVERAGES
    */
    let averageKmPerLiter: number | null = null;

    let averageCostPerKm: number | null = null;

    let previousFullTankId: string | null = null;

    /*
      CALCULATE AVERAGES
    */
    if (dto.fullTank) {
      console.log('FULL TANK => TRUE');

      const previousFullTank = await this.prisma.fuelSupply.findFirst({
        where: {
          vehicleId: dto.vehicleId,
          fullTank: true,
        },
        orderBy: {
          odometer: 'desc',
        },
      });

      console.log('PREVIOUS FULL TANK =>', previousFullTank?.id);

      if (previousFullTank) {
        previousFullTankId = previousFullTank.id;

        const distance = dto.odometer - previousFullTank.odometer;

        console.log('DISTANCE =>', distance);

        if (distance > 0 && liters > 0) {
          averageKmPerLiter = Number((distance / liters).toFixed(2));

          averageCostPerKm = Number((totalAmount / distance).toFixed(2));

          console.log('AVERAGE KM/L =>', averageKmPerLiter);

          console.log('AVERAGE COST/KM =>', averageCostPerKm);
        }
      }
    }

    /*
      CREATE TRANSACTION
    */
    const transaction = await this.prisma.transaction.create({
      data: {
        title: `Fuel - ${vehicle.name}`,

        amount: totalAmount,

        type: TransactionType.EXPENSE,

        date: new Date(),

        userId,

        accountId: dto.accountId,

        categoryId: dto.categoryId,
      },
    });

    console.log('TRANSACTION CREATED =>', transaction.id);

    /*
      UPDATE ACCOUNT BALANCE
    */
    await this.prisma.account.update({
      where: {
        id: dto.accountId,
      },
      data: {
        balance: {
          decrement: totalAmount,
        },
      },
    });

    console.log('ACCOUNT BALANCE UPDATED');

    /*
      CREATE FUEL SUPPLY
    */
    const fuelSupply = await this.prisma.fuelSupply.create({
      data: {
        vehicleId: dto.vehicleId,

        transactionId: transaction.id,

        fuelType: dto.fuelType,

        liters,

        pricePerLiter: dto.pricePerLiter,

        totalAmount,

        odometer: dto.odometer,

        fullTank: dto.fullTank ?? false,

        averageKmPerLiter,

        averageCostPerKm,

        previousFullTankId,

        notes: dto.notes,
      },

      include: {
        vehicle: true,
        transaction: true,
      },
    });

    /*
      UPDATE VEHICLE KM
    */
    await this.prisma.vehicle.update({
      where: {
        id: dto.vehicleId,
      },
      data: {
        currentKm: dto.odometer,
      },
    });

    console.log('VEHICLE KM UPDATED');

    console.log('FUEL CREATED =>', fuelSupply.id);

    console.log('============================================\n');

    return fuelSupply;
  }

  async findAll(userId: string) {
    return this.prisma.fuelSupply.findMany({
      where: {
        vehicle: {
          userId,
        },
      },

      include: {
        vehicle: true,
        transaction: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const fuelSupply = await this.prisma.fuelSupply.findFirst({
      where: {
        id,

        vehicle: {
          userId,
        },
      },

      include: {
        vehicle: true,
        transaction: true,
      },
    });

    if (!fuelSupply) {
      throw new NotFoundException('Fuel supply not found');
    }

    return fuelSupply;
  }

  async update(id: string, userId: string, dto: UpdateFuelSupplyDto) {
    await this.findOne(id, userId);

    return this.prisma.fuelSupply.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    const fuelSupply = await this.findOne(id, userId);

    /*
      RESTORE ACCOUNT BALANCE
    */
    if (fuelSupply.transactionId) {
      const transaction = await this.prisma.transaction.findUnique({
        where: {
          id: fuelSupply.transactionId,
        },
      });

      if (transaction) {
        await this.prisma.account.update({
          where: {
            id: transaction.accountId,
          },
          data: {
            balance: {
              increment: transaction.amount,
            },
          },
        });

        await this.prisma.transaction.delete({
          where: {
            id: transaction.id,
          },
        });
      }
    }

    /*
      DELETE FUEL SUPPLY
    */
    await this.prisma.fuelSupply.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Fuel supply deleted successfully',
    };
  }
}
