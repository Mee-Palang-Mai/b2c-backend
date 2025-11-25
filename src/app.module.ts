import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { AttendanceModuleModule } from './attendance-module/attendance-module.module';
import { RoutesModuleModule } from './routes-module/routes-module.module';
import { ExpenseModuleModule } from './expense-module/expense-module.module';
import { PayrollModuleModule } from './payroll-module/payroll-module.module';
import { IncentiveModuleModule } from './incentive-module/incentive-module.module';
import { HolidayModuleModule } from './holiday-module/holiday-module.module';
import { OvertimeModuleModule } from './overtime-module/overtime-module.module';
import { UsersModuleModule } from './users-module/users-module.module';
import { LeaveModuleModule } from './leave-module/leave-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModuleModule,
    AttendanceModuleModule,
    RoutesModuleModule,
    ExpenseModuleModule,
    PayrollModuleModule,
    IncentiveModuleModule,
    HolidayModuleModule,
    OvertimeModuleModule,
    UsersModuleModule,
    LeaveModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
