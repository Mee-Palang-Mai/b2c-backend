export type AuthUser = {
  empId: number;
  empNo: string;
  username: string;
  empLevel?: string;
  cognitoSub: string;
  jwt: Record<string, unknown>;
};

export type AuthCookies = {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
};
