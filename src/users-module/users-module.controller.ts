import { Controller } from '@nestjs/common';
import { UsersModuleService } from './users-module.service';

@Controller('users-module')
export class UsersModuleController {
  constructor(private readonly usersModuleService: UsersModuleService) {}
}
