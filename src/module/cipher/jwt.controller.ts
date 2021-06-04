import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { GenerateJwtDTO } from './dtos/GenerateJwt.dto';
import { TokenDto } from './dtos/TokenDto';
import { JwtService } from './jwt.service';

@Controller('jwt')
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}

  @MessagePattern('generateJwt')
  generate(@Payload() data: GenerateJwtDTO): { token: string } {
    return this.jwtService.generate(data);
  }

  @MessagePattern('verifyJwt')
  verify(@Payload() data: string): TokenDto {
    return this.jwtService.verifyToken(data);
  }
}
