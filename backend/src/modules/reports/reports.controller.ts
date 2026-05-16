import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { JwtUser } from '@/shared/types/auth/jwt-user.type';

import { FinancialReportDto } from './dto/financial-report.dto';
import { VehicleReportDto } from './dto/vehicle-report.dto';

import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /*
    =========================
    FINANCIAL SUMMARY
    =========================
  */
  @Get('financial/summary')
  financialSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: FinancialReportDto,
  ) {
    return this.reportsService.financialSummary(user.sub, query);
  }

  /*
    =========================
    VEHICLES SUMMARY
    =========================
  */
  @Get('vehicles/summary')
  vehiclesSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: VehicleReportDto,
  ) {
    return this.reportsService.vehiclesSummary(user.sub, query);
  }
}
