import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CryptService } from './crypt.service';

interface EncryptProps {
  toEncrypt: any;
  ignore: Array<string>;
}

@Controller('crypt')
export class CryptController {
  constructor(private readonly cipherService: CryptService) {}

  @MessagePattern('encrypt')
  encrypt(@Payload() data: EncryptProps): any {
    return this.cipherService.encrypt(data.toEncrypt, data.ignore);
  }

  @MessagePattern('decrypt')
  decrypt(encrypted: any): any {
    return this.cipherService.decrypt(encrypted);
  }
}
