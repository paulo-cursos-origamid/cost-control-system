import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './database/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { FuelSuppliesModule } from './modules/fuel-supplies/fuel-supplies.module';
import { MaintenancesModule } from './modules/maintenances/maintenances.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ReportsModule } from './modules/reports/reports.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { RecurringTransactionsModule } from './modules/recurring-transactions/recurring-transactions.module';
import { ScheduleModule } from '@nestjs/schedule';

import { FinancialSchedulerModule } from './modules/financial-scheduler/financial-scheduler.module';
import { InstallmentsModule } from './modules/installments/installments.module';
import { CreditCardsModule } from './modules/credit-cards/credit-cards.module';
import { CreditCardInvoicesModule } from './modules/credit-card-invoices/credit-card-invoices.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),

    PrismaModule,

    AuthModule,
    UsersModule,
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    VehiclesModule,
    FuelSuppliesModule,
    MaintenancesModule,
    DashboardModule,
    ReportsModule,
    TransfersModule,
    LedgerModule,
    RecurringTransactionsModule,
    FinancialSchedulerModule,
    InstallmentsModule,
    CreditCardsModule,
    CreditCardInvoicesModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
