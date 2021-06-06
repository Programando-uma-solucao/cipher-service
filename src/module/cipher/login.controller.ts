import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDTO } from './dtos/Login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern('login')
  login(@Payload() data: LoginDTO) {
    return this.loginService.login(data);
  }
}
