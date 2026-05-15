import { Controller, Get, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /*
    FINANCIAL DASHBOARD
  */
  @Get('financial')
  financial(@CurrentUser() user: JwtUser) {
    return this.dashboardService.financial(user.sub);
  }

  /*
    VEHICLES DASHBOARD
  */
  @Get('vehicles')
  vehicles(@CurrentUser() user: JwtUser) {
    return this.dashboardService.vehicles(user.sub);
  }
}
