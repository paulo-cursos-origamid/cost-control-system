import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateVehicleDto) {
    console.log('=================================');
    console.log('CREATING VEHICLE');
    console.log('USER ID =>', userId);
    console.log('DTO =>', dto);

    try {
      const vehicle = await this.prisma.vehicle.create({
        data: {
          ...dto,
          userId,
        },
      });

      console.log('VEHICLE CREATED =>', vehicle);
      console.log('=================================');

      return vehicle;
    } catch (error) {
      console.log('=================================');
      console.error('ERROR CREATING VEHICLE');
      console.error(error);
      console.log('=================================');

      throw error;
    }
  }
  async findAll(userId: string) {
    return await this.prisma.vehicle.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async update(id: string, userId: string, dto: UpdateVehicleDto) {
    await this.findOne(id, userId);

    return await this.prisma.vehicle.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.vehicle.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Vehicle deleted successfully',
    };
  }
}
