import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenancesService {
  private readonly logger = new Logger(MaintenancesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateMaintenanceDto) {
    this.logger.log(`Creating maintenance for user ${userId}`);

    /*
      VALIDA VEÍCULO
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
      VALIDA CONTA
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
      VALIDA CATEGORIA
    */
    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    /*
      CRIA TRANSACTION
    */
    const transaction = await this.prisma.transaction.create({
      data: {
        title: `Maintenance - ${dto.description}`,
        amount: dto.cost,
        type: 'EXPENSE',
        date: dto.performedAt ? new Date(dto.performedAt) : new Date(),

        userId,
        accountId: dto.accountId,
        categoryId: dto.categoryId,
      },
    });

    this.logger.log(`Transaction created => ${transaction.id}`);

    /*
      CRIA MANUTENÇÃO
    */
    const maintenance = await this.prisma.maintenance.create({
      data: {
        vehicleId: dto.vehicleId,
        transactionId: transaction.id,

        type: dto.type,
        description: dto.description,
        cost: dto.cost,

        odometer: dto.odometer,

        workshop: dto.workshop,

        performedAt: dto.performedAt ? new Date(dto.performedAt) : new Date(),

        nextMaintenanceAt: dto.nextMaintenanceAt
          ? new Date(dto.nextMaintenanceAt)
          : undefined,

        nextMaintenanceKm: dto.nextMaintenanceKm,
      },

      include: {
        vehicle: true,
        transaction: true,
      },
    });

    /*
      ATUALIZA KM DO VEÍCULO
    */
    if (dto.odometer && dto.odometer > vehicle.currentKm) {
      await this.prisma.vehicle.update({
        where: {
          id: vehicle.id,
        },

        data: {
          currentKm: dto.odometer,
        },
      });
    }

    this.logger.log(`Maintenance created => ${maintenance.id}`);

    return maintenance;
  }

  async findAll(userId: string) {
    return this.prisma.maintenance.findMany({
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
    const maintenance = await this.prisma.maintenance.findFirst({
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

    if (!maintenance) {
      throw new NotFoundException('Maintenance not found');
    }

    return maintenance;
  }

  async update(id: string, userId: string, dto: UpdateMaintenanceDto) {
    await this.findOne(id, userId);

    return this.prisma.maintenance.update({
      where: {
        id,
      },

      data: {
        ...dto,

        performedAt: dto.performedAt ? new Date(dto.performedAt) : undefined,

        nextMaintenanceAt: dto.nextMaintenanceAt
          ? new Date(dto.nextMaintenanceAt)
          : undefined,
      },
    });
  }

  async remove(id: string, userId: string) {
    const maintenance = await this.findOne(id, userId);

    /*
      REMOVE TRANSACTION
    */
    if (maintenance.transactionId) {
      await this.prisma.transaction.delete({
        where: {
          id: maintenance.transactionId,
        },
      });
    }

    await this.prisma.maintenance.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Maintenance deleted successfully',
    };
  }
}
