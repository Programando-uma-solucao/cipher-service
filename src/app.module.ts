import { Module } from '@nestjs/common';
import { CryptController } from './module/cipher/crypt.controller';
import { CryptService } from './module/cipher/crypt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtController } from './module/cipher/jwt.controller';
import { JwtService } from './module/cipher/jwt.service';
import { LoginController } from './module/cipher/login.controller';
import { LoginService } from './module/cipher/login.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [CryptController, JwtController, LoginController],
  providers: [CryptService, JwtService, LoginService],
})
export class AppModule {}
