import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationGuard } from './http/guards/authorization.guard';
import { DatabasesModule } from './databases/databases.module';
import { HttpModule } from './http/http.module';
import { AuthResolver } from 'auth/auth.controller';

@Module({
  providers: [AuthorizationGuard, AuthResolver],
  imports: [ConfigModule.forRoot(), DatabasesModule, HttpModule],
  exports: [],
  controllers: [],
})
export class InfraModule {}
