export class CreateUserDto {
  empNo!: string;
  username!: string;
  name!: string;
  nickName?: string;
  phoneNumber?: string;
  email?: string;
  empLevel?: string;
  teamId?: string;
  cognitoSub!: string;
}
