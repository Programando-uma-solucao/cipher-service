import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import * as crypto from 'crypto';

import { Encrypted } from '../../entity/Encrypted';

@Injectable()
export class CryptService {
  private algorithm = process.env.ALGORITHM;
  private salt: Buffer = Buffer.from(process.env.SALT);
  private key: Buffer = Buffer.from(
    this.sha512(process.env.SECRET).substr(0, 32),
  );

  private sha512(data: string): string {
    const hash: crypto.Hmac = crypto.createHmac('sha512', this.salt);
    hash.update(data);
    return hash.digest('base64');
  }

  private getCipher(data: string, iv: crypto.BinaryLike): string {
    const cipher: crypto.Cipher = crypto.createCipheriv(
      this.algorithm,
      this.key,
      iv,
    );

    let ciphered: string = cipher.update(data, 'utf8', 'base64');
    ciphered += cipher.final('base64');

    return ciphered;
  }

  private getDecipher(encrypted: string, iv: string): string {
    const decipher: crypto.Decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, 'base64'),
    );

    const deciphered: Buffer = decipher.update(
      Buffer.from(encrypted, 'base64'),
    );
    return deciphered.toString();
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

  decryptOne(encrypted: string): string {
    const iv: string = encrypted.slice(0, 24);
    const content: string = encrypted.slice(24, encrypted.length);

    return this.getDecipher(content, iv);
  }

  encrypt(data: any, ignore: Array<string> = []): any {
    const result: any = {};

    Object.keys(data).forEach((field) => {
      if (!ignore.includes(field)) {
        const encrypted: Encrypted = this.encryptOne(data[field]);
        result[`${field}Hash`] = encrypted.getHash();

        if (field !== 'password') {
          result[field] = encrypted.getData();
        }
      }
    });

    return result;
  }

  decrypt(encypted: any, ignore: Array<string> = []): any {
    const result: any = {};

    Object.keys(encypted).forEach((field) => {
      if (!field.includes('Hash') && !ignore.includes(field)) {
        result[field] = this.decryptOne(encypted[field]);
      }
    });

    return result;
  }
}
