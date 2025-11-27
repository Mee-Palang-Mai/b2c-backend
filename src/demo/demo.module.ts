import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [DemoController],
})
export class DemoModule {}
