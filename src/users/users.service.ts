import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser() {
    return 'This action returns all overtime requests';
  }
  getUserById(id: string) {
    throw new Error('Method not implemented.');
  }
}
