import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import path from 'path';
import { CustomersService } from 'services/customers.service';
import { ProductsService } from 'services/products.service';
import { PurchasesService } from 'services/purchases.service';

import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchaseResolver } from './graphql/resolvers/purchases.resolver';
import { AuthorizationGuard } from './guards/authorization.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Services
    AuthorizationGuard,
    ProductsService,
    PurchasesService,
    CustomersService,

    //Resolvers
    ProductsResolver,
    PurchaseResolver,
    CustomersResolver,
  ],
})
export class HttpModule {}
