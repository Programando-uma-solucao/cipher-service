import { Test, TestingModule } from '@nestjs/testing';
import { Encrypted } from '../../../src/entity/Encrypted';
import { CipherService } from '../../../src/module/cipher/cipher.service';
import { ConfigModule } from '@nestjs/config';

describe('CipherService', () => {
  let cipherService: CipherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
      ],
      providers: [CipherService],
    }).compile();

    cipherService = module.get<CipherService>(CipherService);
  });

  it('should encrypt single data', () => {
    const hash =
      'b5FgecwC8D5l2oHK5psP7BJpUYK18B6RihmUETW/N884Wp1nYduxkRXCidVoo+FK/xhSDwrEi/Dcp2PXyautXA==';
    const encrypted: Encrypted = cipherService.encryptOne('hello');

    expect(encrypted.getHash()).toBe(hash);
    expect(encrypted.getData()).not.toBe(null);
  });

  it('should encrypt object', () => {
    const hash =
      'b5FgecwC8D5l2oHK5psP7BJpUYK18B6RihmUETW/N884Wp1nYduxkRXCidVoo+FK/xhSDwrEi/Dcp2PXyautXA==';
    const encryptedObject: any = cipherService.encrypt({ test: 'hello' });

    expect(encryptedObject['testHash']).toBe(hash);
    expect(encryptedObject['test']).not.toBe(null);
  });
});
