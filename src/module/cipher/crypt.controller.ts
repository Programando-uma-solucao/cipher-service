import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Encrypted } from '../../entity/Encrypted';
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
  decrypt(@Payload() encrypted: any): any {
    return this.cipherService.decrypt(encrypted);
  }

  @MessagePattern('encryptOne')
  encryptOne(@Payload() data: string): Encrypted {
    return this.cipherService.encryptOne(data);
  }
}
