import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateFuelSupplyDto } from './dto/create-fuel-supply.dto';
import { UpdateFuelSupplyDto } from './dto/update-fuel-supply.dto';

@Injectable()
export class FuelSuppliesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateFuelSupplyDto) {
    console.log('================ FUEL CREATE ================');
    console.log('USER =>', userId);
    console.log('DTO =>', dto);

    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: dto.vehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    let liters = dto.liters;
    let totalAmount = dto.totalAmount;

    /*
      REGRAS:

      1 - informou litros + preço?
          calcula total

      2 - informou total + preço?
          calcula litros

      3 - informou os 3?
          usa os valores enviados

      4 - faltando dados?
          erro
    */

    if (!liters && totalAmount) {
      liters = totalAmount / dto.pricePerLiter;
    }

    if (!totalAmount && liters) {
      totalAmount = liters * dto.pricePerLiter;
    }

    if (!liters || !totalAmount) {
      throw new BadRequestException('Provide liters or totalAmount');
    }

    let averageKmPerLiter: number | null = null;
    let averageCostPerKm: number | null = null;
    let previousFullTankId: string | null = null;

    /*
      CALCULAR MÉDIA SOMENTE
      QUANDO FOR TANQUE CHEIO
    */

    if (dto.fullTank) {
      const previousFullTank = await this.prisma.fuelSupply.findFirst({
        where: {
          vehicleId: dto.vehicleId,
          fullTank: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (previousFullTank) {
        previousFullTankId = previousFullTank.id;

        const distance = dto.odometer - previousFullTank.odometer;

        if (distance > 0) {
          averageKmPerLiter = distance / liters;

          averageCostPerKm = totalAmount / distance;
        }
      }
    }

    const fuelSupply = await this.prisma.fuelSupply.create({
      data: {
        vehicleId: dto.vehicleId,
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
    });

    /*
      ATUALIZA KM ATUAL DO VEÍCULO
    */

    await this.prisma.vehicle.update({
      where: {
        id: dto.vehicleId,
      },
      data: {
        currentKm: dto.odometer,
      },
    });

    console.log('FUEL CREATED =>', fuelSupply.id);

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
    await this.findOne(id, userId);

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
