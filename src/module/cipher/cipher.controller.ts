import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CipherService } from './cipher.service';

@Controller('cipher')
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @MessagePattern('encrypt')
  encrypt(data: any): any {
    return this.cipherService.encrypt(data);
  }

  @MessagePattern('decrypt')
  decrypt(encrypted: any): any {
    return this.cipherService.decrypt(encrypted);
  }
}
