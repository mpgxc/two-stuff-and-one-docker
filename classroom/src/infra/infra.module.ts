import { Global, Module } from '@nestjs/common';

import { DatabasesModule } from './databases/databases.module';
import { HttpModule } from './http/http.module';

@Global()
@Module({
  imports: [DatabasesModule, HttpModule],
  exports: [DatabasesModule],
})
export class InfraModule {}
