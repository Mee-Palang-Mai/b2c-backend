import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { CognitoAuthGuard } from 'src/guard/cognito-jwt.guard';
import { RolesGuard } from 'src/guard/role.guard';

@Controller('demo')
@UseGuards(CognitoAuthGuard, RolesGuard)
export class DemoController {
  @ApiOperation({ summary: 'Any authenticated user' })
  @Get('all')
  profile() {
    return { message: 'Authenticated OK' };
  }

  @ApiOperation({ summary: 'EMPLOYEE, SUPERVISOR, ADMIN' })
  @Get('employee')
  @Roles('EMPLOYEE', 'SUPERVISOR', 'ADMIN')
  employeeOnly() {
    return { message: 'EMPLOYEE ACCESS OK' };
  }

  @ApiOperation({ summary: 'SUPERVISOR & ADMIN' })
  @Get('supervisor')
  @Roles('SUPERVISOR', 'ADMIN')
  supervisorOnly() {
    return { message: 'SUPERVISOR & ADMIN ACCESS OK' };
  }

  @ApiOperation({ summary: 'ADMIN ONLY' })
  @Get('admin')
  @Roles('ADMIN')
  adminOnly() {
    return { message: 'ADMIN ACCESS OK' };
  }
}
