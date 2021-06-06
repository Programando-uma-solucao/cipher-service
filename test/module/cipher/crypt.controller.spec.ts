import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CryptService } from '../../../src/module/cipher/crypt.service';
import { CryptController } from '../../../src/module/cipher/crypt.controller';
import { Encrypted } from '../../../src/entity/Encrypted';

describe('AccountController', () => {
  let cryptController: CryptController;

  beforeEach(async () => {
    const account: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
      ],
      controllers: [CryptController],
      providers: [CryptService],
    }).compile();

    cryptController = account.get<CryptController>(CryptController);
  });

  it('should encrypt a single data', () => {
    const data = 'hello world';
    const hash =
      'jmFSqc704DSgNCmoE34P4yNYwVpqofGcaTKm9u+0jpsnCJiNiUZktEE4+HVnn25Ew5YooPTCzZDKGU4Y3+4mbQ==';

    const encrypted: Encrypted = cryptController.encryptOne(data);
    expect(encrypted.getHash()).toEqual(hash);
    expect(encrypted.getData()).not.toBeNull();
  });
});
