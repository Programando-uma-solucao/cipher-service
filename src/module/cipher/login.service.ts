import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AccountServiceConfig } from 'src/config/microservices.config';
import { CryptService } from './crypt.service';
import { JwtService } from './jwt.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject(AccountServiceConfig.name)
    private readonly accountService: ClientProxy,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data) {
    const { email, password } = data;

    const account = await this.accountService
      .send('getAccount', { email })
      .toPromise();

    if (!account)
      throw new RpcException({
        httpCode: 404,
        message: 'This user email is not registered',
      });

    const passEncrypted = this.cryptService.encryptOne(password);

    if (account.password == passEncrypted.getHash()) {
      const name = this.cryptService.decryptOne(account.name);
      return this.jwtService.generate({
        id: account._id,
        name: name,
        role: account.role,
        email: data.email,
      });
    }

    throw new RpcException({
      httpCode: 400,
      message: 'Invalid Password',
    });
  }
}
