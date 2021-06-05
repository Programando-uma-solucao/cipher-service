import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AccountServiceConfig } from "src/config/microservices.config";
import { CryptService } from './crypt.service';
import { JwtService } from "./jwt.service";


@Injectable()
export class LoginService{
    
    constructor(
        @Inject(AccountServiceConfig.name)
        private readonly accountService: ClientProxy,
        private readonly cryptService: CryptService,
        private readonly jwtService: JwtService
    ) {}

    async login(data){
        const emailEncrypted = this.cryptService.encryptOne(data.email);
        const passEncrypted = this.cryptService.encryptOne(data.password);

        var account = await this.accountService
            .send('getAccount', emailEncrypted.getHash())
            .toPromise();

            console.log(account);

        if(account && account.password == passEncrypted.getHash()){
            const name = this.cryptService.decryptOne(account.name)
            return this.jwtService.generate({
                id: account._id,
                name: name,
                role: account.role,
                email: data.email
              })
        }
            
        
    }
}