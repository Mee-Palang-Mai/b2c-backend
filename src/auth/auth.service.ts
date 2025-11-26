import {
  AuthFlowType,
  AdminCreateUserCommand,
  AdminCreateUserCommandOutput,
  AdminSetUserPasswordCommand,
  AdminSetUserPasswordCommandOutput,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

@Injectable()
export class AuthService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly region: string;
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly clientSecret?: string;

  constructor() {
    this.region = requireEnv('AWS_REGION');
    this.userPoolId = requireEnv('COGNITO_USER_POOL_ID');
    this.clientId = requireEnv('COGNITO_CLIENT_ID');
    this.clientSecret = process.env.COGNITO_CLIENT_SECRET || undefined;

    const hasExplicitCreds =
      !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY;

    this.client = new CognitoIdentityProviderClient({
      region: this.region,
      ...(hasExplicitCreds && {
        credentials: {
          accessKeyId: requireEnv('AWS_ACCESS_KEY_ID'),
          secretAccessKey: requireEnv('AWS_SECRET_ACCESS_KEY'),
        },
      }),
    });
  }

  private getSecretHash(username: string): string | undefined {
    if (!this.clientSecret) return undefined;

    const hmac = crypto.createHmac('SHA256', this.clientSecret);
    hmac.update(username + this.clientId);
    return hmac.digest('base64');
  }

  adminCreateUser(
    username: string,
    email: string,
  ): Promise<AdminCreateUserCommandOutput> {
    const command = new AdminCreateUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      UserAttributes: [{ Name: 'email', Value: email }],
      MessageAction: 'SUPPRESS',
    });

    return this.client.send(command);
  }

  setPassword(
    username: string,
    password: string,
  ): Promise<AdminSetUserPasswordCommandOutput> {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      Password: password,
      Permanent: true,
    });

    return this.client.send(command);
  }

  async signupAdmin(
    username: string,
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    await this.adminCreateUser(username, email);
    await this.setPassword(username, password);
    return { message: 'User created' };
  }

  /**
   * USER_PASSWORD_AUTH login using username + password.
   */
  login(
    username: string,
    password: string,
  ): Promise<InitiateAuthCommandOutput> {
    const authParameters: Record<string, string> = {
      USERNAME: username,
      PASSWORD: password,
    };

    const secretHash = this.getSecretHash(username);
    if (secretHash) {
      authParameters.SECRET_HASH = secretHash;
    }

    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: authParameters,
    });

    return this.client.send(command);
  }

  refresh(
    refreshToken: string,
    cognitoUsernameForHash?: string,
  ): Promise<InitiateAuthCommandOutput> {
    const authParameters: Record<string, string> = {
      REFRESH_TOKEN: refreshToken,
    };

    if (this.clientSecret) {
      if (!cognitoUsernameForHash) {
        throw new Error(
          'cognitoUsernameForHash is required for refresh when COGNITO_CLIENT_SECRET is set. Pass the internal Cognito username (cognito:username / sub).',
        );
      }

      const secretHash = this.getSecretHash(cognitoUsernameForHash);
      authParameters.SECRET_HASH = secretHash!;
    }

    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: this.clientId,
      AuthParameters: authParameters,
    });

    return this.client.send(command);
  }
}
