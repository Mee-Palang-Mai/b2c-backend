export class CreateUserDto {
  empId!: number;
  empNo!: string;
  username!: string;
  password?: string;
  empName!: string;
  nickName?: string;
  phoneNumber?: string;
  email?: string;
  empLevel?: string;
  teamId?: string;
  cognitoSub!: string;
}
