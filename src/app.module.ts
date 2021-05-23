import { Module } from '@nestjs/common';
import { CipherController } from './module/cipher/cipher.controller';
import { CipherService } from './module/cipher/cipher.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [CipherController],
  providers: [CipherService],
})
export class AppModule {}
