import {
  AuthFlowType,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()
export class CognitoService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly clientSecret?: string;

  constructor() {
    this.userPoolId =
      process.env.COGNITO_USER_POOL_ID || 'ap-southeast-1_xxxxxxxxx';
    this.clientId =
      process.env.COGNITO_CLIENT_ID || 'xxxxxxxxxxxxxxxxxxxxxxxxxx';
    this.clientSecret = process.env.COGNITO_CLIENT_SECRET || undefined;

    const hasExplicitCreds =
      !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY;

    this.client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION || 'ap-southeast-1',
      ...(hasExplicitCreds && {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
      }),
    });
  }

  private handleAwsError(error: unknown): never {
    const err = error as {
      name?: string;
      __type?: string;
      message?: string;
      Message?: string;
      $metadata?: { httpStatusCode?: number };
    };

    const status = err.$metadata?.httpStatusCode ?? 500;
    const code = err.name ?? err.__type ?? 'CognitoError';
    const message = err.message ?? err.Message ?? 'AWS Cognito Error';

    console.error('[COGNITO ERROR]', { code, status, message });

    throw new Error(`${code}: ${message}`);
  }

  private getSecretHash(username: string): string | undefined {
    if (!this.clientSecret) return undefined;

    const hmac = crypto.createHmac('SHA256', this.clientSecret);
    hmac.update(username + this.clientId);
    return hmac.digest('base64');
  }

  async adminCreateUser(username: string, email: string) {
    try {
      return await this.client.send(
        new AdminCreateUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          UserAttributes: [{ Name: 'email', Value: email }],
          MessageAction: 'SUPPRESS',
        }),
      );
    } catch (err) {
      this.handleAwsError(err);
    }
  }

  async setPassword(username: string, password: string) {
    try {
      return await this.client.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          Password: password,
          Permanent: true,
        }),
      );
    } catch (err) {
      this.handleAwsError(err);
    }
  }

  async login(username: string, password: string) {
    try {
      const AuthParameters: Record<string, string> = {
        USERNAME: username,
        PASSWORD: password,
      };

      const secretHash = this.getSecretHash(username);
      if (secretHash) AuthParameters.SECRET_HASH = secretHash;

      return await this.client.send(
        new InitiateAuthCommand({
          AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
          ClientId: this.clientId,
          AuthParameters,
        }),
      );
    } catch (err) {
      this.handleAwsError(err);
    }
  }

  async refresh(refreshToken: string, cognitoUsernameForHash?: string) {
    try {
      const AuthParameters: Record<string, string> = {
        REFRESH_TOKEN: refreshToken,
      };

      if (this.clientSecret) {
        if (!cognitoUsernameForHash) {
          throw new Error(
            'cognitoUsernameForHash is required when secret enabled',
          );
        }

        AuthParameters.SECRET_HASH = this.getSecretHash(
          cognitoUsernameForHash,
        )!;
      }

      return await this.client.send(
        new InitiateAuthCommand({
          AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
          ClientId: this.clientId,
          AuthParameters,
        }),
      );
    } catch (err) {
      this.handleAwsError(err);
    }
  }

  async adminCreateUserWithSub(username: string, email: string) {
    try {
      const result = await this.adminCreateUser(username, email);

      const sub =
        result.User?.Attributes?.find((a) => a.Name === 'sub')?.Value ?? null;

      return { result, sub };
    } catch (err) {
      this.handleAwsError(err);
    }
  }
}
