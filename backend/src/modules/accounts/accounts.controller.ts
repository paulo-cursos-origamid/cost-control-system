import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { AccountsService } from './accounts.service';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.accountsService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.accountsService.findOne(id, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, user.sub, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.accountsService.remove(id, user.sub);
  }
  @Patch(':id/restore')
  restore(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.accountsService.restore(id, user.sub);
  }
}
