import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersModuleService } from './users-module.service';

@Controller('users')
export class UsersModuleController {
  constructor(private readonly usersModuleService: UsersModuleService) {}

  @Get()
  getUser() {
    return this.usersModuleService.getUser();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersModuleService.getUserById(id);
  }
}
