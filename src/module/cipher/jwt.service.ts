import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { RpcException } from '@nestjs/microservices';

import { GenerateJwtDTO } from './dtos/GenerateJwt.dto';
import jwtConfig from '../../config/jwt';
import { TokenDto } from './dtos/TokenDto';

@Injectable()
export class JwtService {
  generate(data: GenerateJwtDTO) {
    const { secret, expiresIn } = jwtConfig;

    const token = sign(
      {
        ...data,
      },
      secret,
      {
        subject: data.id,
        expiresIn,
      },
    );

    return { token };
  }

  verifyToken(token: string): TokenDto {
    try {
      const decoded = verify(token, jwtConfig.secret);

      const { sub, exp, iat } = decoded as TokenDto;

      return { sub, exp, iat };
    } catch (error) {
      throw new RpcException({
        httpCode: 401,
        message: 'Invalid token',
      });
    }
  }
}
