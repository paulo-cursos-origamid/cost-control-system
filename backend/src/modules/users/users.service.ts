import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/database/prisma.service';

import { AuditService } from '@/modules/audit/audit.service';

import { AuditAction } from '@/shared/types/enums/audit-action.enum';

import { getObjectDiff } from '@/common/utils/get-object-diff';

import type { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly auditService: AuditService,
  ) {}

  async create(data: CreateUserDto, currentUser: JwtUser) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    await this.auditService.register({
      action: AuditAction.USER_CREATE,

      entity: 'USER',

      entityId: user.id,

      userId: currentUser.sub,

      userEmail: currentUser.email,

      method: 'POST',

      route: '/users',

      metadata: {
        createdUserId: user.id,
        createdUserEmail: user.email,
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, data: UpdateUserDto, currentUser: JwtUser) {
    const oldUser = await this.findOne(id);

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    const diff = getObjectDiff(oldUser, updatedUser);

    await this.auditService.register({
      action: AuditAction.USER_UPDATE,

      entity: 'USER',

      entityId: updatedUser.id,

      userId: currentUser.sub,

      userEmail: currentUser.email,

      method: 'PATCH',

      route: `/users/${id}`,

      metadata: diff,
    });

    return updatedUser;
  }

  async remove(id: string, currentUser: JwtUser) {
    const user = await this.findOne(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    await this.auditService.register({
      action: AuditAction.USER_DELETE,

      entity: 'USER',

      entityId: user.id,

      userId: currentUser.sub,

      userEmail: currentUser.email,

      method: 'DELETE',

      route: `/users/${id}`,

      metadata: {
        deletedUserId: user.id,
        deletedUserEmail: user.email,
      },
    });

    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
