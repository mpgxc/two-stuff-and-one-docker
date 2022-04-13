import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type Customer = {
  auth_user_id: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
};

type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

@Controller()
export class PurchasesController {
  @EventPattern('purchases.create-purchase')
  async purchasesCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    console.log('>>>', payload);
  }
}
