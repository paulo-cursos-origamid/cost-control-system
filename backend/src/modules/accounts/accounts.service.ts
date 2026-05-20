import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        ...dto,
        balance: dto.balance ?? 0,
        type: dto.type,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    const accounts = await this.prisma.account.findMany({
      where: {
        userId,
        deletedAt: null,
      },

      include: {
        ledgerEntries: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedAccounts = accounts.map((account) => {
      const balance = account.ledgerEntries.reduce((acc, entry) => {
        if (entry.type === 'CREDIT') {
          return acc + Number(entry.amount);
        }

        return acc - Number(entry.amount);
      }, 0);

      return {
        ...account,
        balance,
      };
    });

    return formattedAccounts;
  }

  async findOne(id: string, userId: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: {
        ledgerEntries: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }
    const balance = account.ledgerEntries.reduce((acc, entry) => {
      if (entry.type === 'CREDIT') {
        return acc + Number(entry.amount);
      }

      return acc - Number(entry.amount);
    }, 0);
    return {
      ...account,
      balance,
    };
  }

  async update(id: string, userId: string, dto: UpdateAccountDto) {
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
