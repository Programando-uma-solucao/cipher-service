import { Module } from '@nestjs/common';
import { CryptController } from './module/cipher/crypt.controller';
import { CryptService } from './module/cipher/crypt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtController } from './module/cipher/jwt.controller';
import { JwtService } from './module/cipher/jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [CryptController, JwtController],
  providers: [CryptService, JwtService],
})
export class AppModule {}
