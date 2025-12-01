export class UserResponseDto {
  empId!: number;
  empNo!: string;
  username!: string;
  name!: string;
  nickName?: string;
  email?: string;
  phoneNumber?: string;
  teamId?: string;
  role?: string;
  cognitoSub!: string;
}
