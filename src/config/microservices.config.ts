import { ClientProviderOptions, Transport } from '@nestjs/microservices';

const AccountServiceConfig: ClientProviderOptions = {
  name: 'ACCOUNT_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 8081,
  },
};

export { AccountServiceConfig };
