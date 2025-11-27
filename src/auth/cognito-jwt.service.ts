/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';

export interface CognitoJwtPayload extends JWTPayload {
  sub: string;
  email?: string;
  'cognito:username'?: string;
}

@Injectable()
export class CognitoJwtService {
  private jwks: ReturnType<typeof createRemoteJWKSet>;
  private issuer: string;
  private audience: string;

  constructor() {
    const region = process.env.AWS_REGION!;
    const userPoolId = process.env.COGNITO_USER_POOL_ID!;
    const clientId = process.env.COGNITO_CLIENT_ID!;

    this.issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
    this.audience = clientId;

    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}/.well-known/jwks.json`),
    );
  }

  async verifyToken(token: string): Promise<CognitoJwtPayload> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
      });

      if (payload.client_id !== this.audience) {
        throw new UnauthorizedException('Invalid client_id');
      }

      if (payload.token_use !== 'access') {
        throw new UnauthorizedException('Not an access token');
      }

      return payload as CognitoJwtPayload;
    } catch (err) {
      console.error('JWT VERIFY ERROR:', err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
