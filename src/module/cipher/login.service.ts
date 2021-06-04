import { Injectable } from "@nestjs/common";
import { CryptService } from './crypt.service';

@Injectable()
export class LoginService{

    login(data){return data}
}