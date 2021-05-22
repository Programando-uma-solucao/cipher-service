import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CipherService } from './cipher.service';

@Controller()
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @MessagePattern('encrypt')
  encrypt(): string {
    return this.cipherService.encrypt();
  }
}
