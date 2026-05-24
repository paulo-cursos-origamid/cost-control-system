import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

import { CreateCreditCardDto } from './dto/create-credit-card.dto';

import { CreditCardsService } from './credit-cards.service';

@ApiTags('Credit Cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateCreditCardDto) {
    return this.creditCardsService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.creditCardsService.findAll(user.sub);
  }

  @Patch(':id/deactivate')
  deactivate(
    @CurrentUser() user: JwtUser,

    @Param('id') id: string,
  ) {
    return this.creditCardsService.deactivate(user.sub, id);
  }
}
