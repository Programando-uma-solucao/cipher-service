import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('login')
export class LoginController{
    @MessagePattern('login')
    login(data){
        return data;
    }
}