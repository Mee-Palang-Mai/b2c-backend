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
        name: dto.name,
        nickName: dto.nickName ?? null,
        phoneNumber: dto.phoneNumber ?? null,
        email: dto.email ?? null,
        empLevel: dto.empLevel ?? null,
        teamId: dto.teamId ?? null,
        cognitoSub: dto.cognitoSub,
        workStart: new Date(),
        workStatus: 'ACTIVE',
        createAt: new Date(),
        updateAt: new Date(),
      },
    });
  }

  formatUser(user: unknown): UserResponseDto | null {
    if (
      typeof user !== 'object' ||
      user === null ||
      !('empId' in user) ||
      !('empNo' in user) ||
      !('username' in user) ||
      !('name' in user) ||
      !('cognitoSub' in user)
    ) {
      return null;
    }

    const u = user as {
      empId: string;
      empNo: string;
      username: string;
      name: string;
      nickName?: string | null;
      email?: string | null;
      phoneNumber?: string | null;
      teamId?: string | null;
      empLevel?: string | null;
      cognitoSub: string;
    };

    return {
      empId: u.empId,
      empNo: u.empNo,
      username: u.username,
      name: u.name,
      nickName: u.nickName ?? undefined,
      email: u.email ?? undefined,
      phoneNumber: u.phoneNumber ?? undefined,
      teamId: u.teamId ?? undefined,
      role: u.empLevel ?? undefined,
      cognitoSub: u.cognitoSub,
    };
  }
}
