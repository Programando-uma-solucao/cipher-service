import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Encrypted } from '../../entity/Encrypted';
import { CryptService } from './crypt.service';

interface CryptProps {
  data: any;
  ignore: Array<string>;
}

@Controller('crypt')
export class CryptController {
  constructor(private readonly cipherService: CryptService) {}

  @MessagePattern('encrypt')
  encrypt(@Payload() encrypt: CryptProps): any {
    return this.cipherService.encrypt(encrypt.data, encrypt.ignore);
  }

  @MessagePattern('decrypt')
  decrypt(@Payload() decrypt: CryptProps): any {
    return this.cipherService.decrypt(decrypt.data, decrypt.ignore);
  }

  @MessagePattern('encryptOne')
  encryptOne(@Payload() data: string): Encrypted {
    return this.cipherService.encryptOne(data);
  }
}
