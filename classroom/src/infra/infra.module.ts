import { Global, Module } from '@nestjs/common';

import { DatabasesModule } from './databases/databases.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Global()
@Module({
  imports: [DatabasesModule, MessagingModule, HttpModule],
  exports: [DatabasesModule],
})
export class InfraModule {}
