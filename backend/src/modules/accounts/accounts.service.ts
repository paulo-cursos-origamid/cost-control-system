import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateAccountDto,
  ) {
    return this.prisma.account.create({
      data: {
        ...dto,
        balance: dto.balance ?? 0,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const account =
      await this.prisma.account.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!account) {
      throw new NotFoundException(
        'Account not found',
      );
    }

    return account;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateAccountDto,
  ) {
    await this.findOne(id, userId);

    return this.prisma.account.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.account.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Account deleted successfully',
    };
  }
}