import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { LedgerService } from '../ledger/ledger.service';
@Injectable()
export class AccountsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ledgerService: LedgerService,
  ) {}

  async create(userId: string, dto: CreateAccountDto) {
    const account = await this.prisma.account.create({
      data: {
        name: dto.name,
        type: dto.type,
        initialBalance: dto.initialBalance ?? 0,
        balance: 0,
        userId,
      },
    });

    /*
    CREATE INITIAL LEDGER ENTRY
  */
    if (dto.initialBalance && dto.initialBalance > 0) {
      await this.ledgerService.createEntry({
        userId,
        accountId: account.id,
        type: 'CREDIT',
        amount: dto.initialBalance,
        description: 'Initial account balance',
        referenceType: 'TRANSACTION',
        referenceId: account.id,
      });
    }

    return this.findOne(account.id, userId);
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

    await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'Account deleted successfully',
    };
  }

  async restore(id: string, userId: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
