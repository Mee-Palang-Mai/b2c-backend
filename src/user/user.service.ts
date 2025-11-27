import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  async findByCognitoSub(cognitoSub: string) {
    return this.prisma.user.findFirst({
      where: { cognitoSub },
    });
  }

  async updateCognitoSub(username: string, sub: string) {
    return this.prisma.user.updateMany({
      where: { username },
      data: { cognitoSub: sub },
    });
  }

  async createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        empId: dto.empId,
        empNo: dto.empNo,
        username: dto.username,
        password: dto.password ?? null,
        empName: dto.empName,
        nickName: dto.nickName ?? null,
        phoneNumber: dto.phoneNumber ?? null,
        email: dto.email ?? null,
        empLevel: dto.empLevel ?? null,
        teamId: dto.teamId ?? null,
        cognitoSub: dto.cognitoSub,
        workStart: new Date(),
        workStatus: 'ACTIVE',
        createDate: new Date(),
        updateDate: new Date(),
      },
    });
  }

  formatUser(user: unknown): UserResponseDto | null {
    if (typeof user !== 'object' || user === null) return null;

    const u = user as Record<string, unknown>;

    if (
      typeof u.empId !== 'number' ||
      typeof u.empNo !== 'string' ||
      typeof u.username !== 'string' ||
      typeof u.empName !== 'string' ||
      typeof u.cognitoSub !== 'string'
    ) {
      return null;
    }

    return {
      empId: u.empId,
      empNo: u.empNo,
      username: u.username,
      name: u.empName,
      nickName: typeof u.nickName === 'string' ? u.nickName : undefined,
      email: typeof u.email === 'string' ? u.email : undefined,
      phoneNumber:
        typeof u.phoneNumber === 'string' ? u.phoneNumber : undefined,
      teamId: typeof u.teamId === 'string' ? u.teamId : undefined,
      role: typeof u.empLevel === 'string' ? u.empLevel : undefined,
      cognitoSub: u.cognitoSub,
    };
  }
}
