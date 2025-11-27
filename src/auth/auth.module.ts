import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CognitoJwtService } from './cognito-jwt.service';
import { CognitoAuthGuard } from 'src/guard/cognito-jwt.guard';
import { CognitoService } from './cognito.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, CognitoService, CognitoJwtService, CognitoAuthGuard],
  exports: [AuthService, CognitoJwtService, CognitoAuthGuard],
})
export class AuthModule {}
