import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import * as crypto from 'crypto';

import { Encrypted } from '../../entity/Encrypted';

@Injectable()
export class CipherService {
  private algorithm = process.env.ALGORITHM;
  private salt: Buffer = Buffer.from(process.env.SALT);
  private key: string = this.sha512(process.env.SECRET).substr(0, 32);

  private sha512(data: string): string {
    const hash: crypto.Hmac = crypto.createHmac('sha512', this.salt);
    hash.update(data);
    return hash.digest('base64');
  }

  private getCipher(data: string, iv: crypto.BinaryLike): string {
    const cypher: crypto.Cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      iv,
    );

    let cyphered: string = cypher.update(data, 'utf8', 'base64');
    cyphered += cypher.final('base64');

    return cyphered;
  }

  private getIV(): Buffer {
    return Buffer.from(crypto.randomBytes(16));
  }

  encryptOne(data: any): Encrypted {
    const iv: Buffer = this.getIV();
    const ciphered: string = this.getCipher(String(data), iv);

    const encrypted = `${iv.toString('base64')}${ciphered}`;
    const hash: string = this.sha512(String(data));

    return new Encrypted(encrypted, hash);
  }

  encrypt(data: any, ignore: Array<string> = []): any {
    const result: any = {};

    Object.keys(data).forEach((field) => {
      if (!ignore.includes(field)) {
        if (field == 'password') {
          result[`${field}Hash`] = this.sha512(data[field]);
        } else {
          const encrypted: Encrypted = this.encryptOne(data[field]);
          result[field] = encrypted.getData();
          result[`${field}Hash`] = encrypted.getHash();
        }
      }
    });

    return result;
  }
}
