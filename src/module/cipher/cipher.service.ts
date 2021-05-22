import { Injectable } from '@nestjs/common';

@Injectable()
export class CipherService {
  encrypt(): string {
    return 'data encrypted';
  }
}
