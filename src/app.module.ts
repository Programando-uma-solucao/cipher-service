import { Module } from '@nestjs/common';
import { CryptController } from './module/cipher/crypt.controller';
import { CryptService } from './module/cipher/crypt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtController } from './module/cipher/jwt.controller';
import { JwtService } from './module/cipher/jwt.service';
import { LoginController } from './module/cipher/login.controller';
import { LoginService } from './module/cipher/login.service';
import { ClientsModule } from '@nestjs/microservices';
import { AccountServiceConfig } from './config/microservices.config';

@Module({
  imports: [
    ClientsModule.register([AccountServiceConfig]),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env'],
    }),
  ],
  controllers: [CryptController, JwtController, LoginController],
  providers: [CryptService, JwtService, LoginService],
})
export class AppModule {}
