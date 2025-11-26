import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { RoutesModule } from './routes/routes.module';
import { ExpenseModule } from './expense/expense.module';
import { PayrollModule } from './payroll/payroll.module';
import { IncentiveModule } from './incentive/incentive.module';
import { HolidayModule } from './holiday/holiday.module';
import { OvertimeModule } from './overtime/overtime.module';
import { UsersModule } from './users/users.module';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    AttendanceModule,
    RoutesModule,
    ExpenseModule,
    PayrollModule,
    IncentiveModule,
    HolidayModule,
    OvertimeModule,
    UsersModule,
    LeaveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
