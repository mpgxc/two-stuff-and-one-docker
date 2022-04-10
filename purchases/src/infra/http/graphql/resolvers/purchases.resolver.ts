import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CustomersService } from 'services/customers.service';
import { ProductsService } from 'services/products.service';
import { PurchasesService } from 'services/purchases.service';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { AuthUser, CurrentUser } from '../../guards/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly productsService: ProductsService,
    private readonly customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAll();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.findById(purchase.product_id);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @CurrentUser() user: AuthUser,
    @Args('data')
    { product_id }: CreatePurchaseInput,
  ) {
    let customer = await this.customersService.findByAuthId(user.sub);

    if (!customer) {
      customer = await this.customersService.create({
        auth_user_id: user.sub,
      });
    }

    return this.purchasesService.create({
      product_id,
      customer_id: customer.id,
      assigned_by: `${customer.auth_user_id}`,
    });
  }
}
