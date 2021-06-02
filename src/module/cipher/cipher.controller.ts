import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CipherService } from './cipher.service';

interface EncryptProps {
  toEncrypt: any;
  ignore: Array<string>;
}

@Controller('cipher')
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @MessagePattern('encrypt')
  encrypt(@Payload() data: EncryptProps): any {
    return this.cipherService.encrypt(data.toEncrypt, data.ignore);
  }

  @MessagePattern('decrypt')
  decrypt(encrypted: any): any {
    return this.cipherService.decrypt(encrypted);
  }
}
