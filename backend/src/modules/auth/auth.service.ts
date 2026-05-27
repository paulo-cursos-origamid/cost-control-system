import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/database/prisma.service';

import { LoginDto } from './dto/login.dto';
import { rolePermissions } from './constants/role-permissions';

import { AuditService } from '@/modules/audit/audit.service';

import { AuditAction } from '@/shared/types/enums/audit-action.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: rolePermissions[user.role],
    };

    const access_token = await this.jwtService.signAsync(payload);

    await this.auditService.register({
      userId: user.id,
      userEmail: user.email,

      action: AuditAction.LOGIN,

      entity: 'User',
      entityId: user.id,

      method: 'POST',
      route: '/api/auth/login',
    });

    return {
      access_token,
    };
  }
}
