import { Module } from '@nestjs/common';
import { CipherController } from './module/cipher/cipher.controller';
import { CipherService } from './module/cipher/cipher.service';

@Module({
  imports: [],
  controllers: [CipherController],
  providers: [CipherService],
})
export class AppModule {}
