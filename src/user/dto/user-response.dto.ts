export class UserResponseDto {
  empId!: string;
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
