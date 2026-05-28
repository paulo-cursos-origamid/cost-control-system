import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/types/enums/role.enum';

import { Permissions } from '@/common/decorators/permissions.decorator';
import { Permission } from '@/shared/types/enums/permissions.enum';
import { Audit } from '@/common/decorators/audit.decorator';
import { AuditAction } from '@/shared/types/enums/audit-action.enum';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtUser } from '@/shared/types/auth/jwt-user.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() data: CreateUserDto,

    @CurrentUser()
    currentUser: JwtUser,
  ) {
    return this.usersService.create(data, currentUser);
  }

  @Audit(AuditAction.USERS_LIST, 'USER')
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Permissions(Permission.USERS_READ)
  @Roles(Role.ADMIN)
  findAll() {
    return {
      message: 'Only admins can access',
      data: this.usersService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body() data: UpdateUserDto,

    @CurrentUser()
    currentUser: JwtUser,
  ) {
    return this.usersService.update(id, data, currentUser);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,

    @CurrentUser()
    currentUser: JwtUser,
  ) {
    return this.usersService.remove(id, currentUser);
  }
}
