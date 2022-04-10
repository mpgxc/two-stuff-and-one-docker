import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductsService } from 'services/products.service';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/products';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productService.listAll();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.create(data);
  }
}
