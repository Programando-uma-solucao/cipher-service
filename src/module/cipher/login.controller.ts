import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController{
    constructor(private readonly loginService: LoginService) {}

    @MessagePattern('login')
    login(data){
        return this.loginService.login(data);
    }
}