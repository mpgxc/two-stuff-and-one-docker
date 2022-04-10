import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Product } from './products';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPORVED = 'APPORVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available Purchase Status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id!: string;

  @Field(() => PurchaseStatus)
  status!: PurchaseStatus;

  @Field()
  assigned_by!: string;

  @Field()
  assigned_at!: Date;

  @Field(() => Product)
  product!: Product;

  product_id!: string;
}
