import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

type CreatePurchaseProps = {
  product_id: string;
  customer_id: string;
  assigned_by: string;
};

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      orderBy: {
        assigned_by: 'desc',
      },
    });
  }

  async listAllByAuthId(customer_id): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: {
        customer_id,
      },
      orderBy: {
        assigned_by: 'desc',
      },
    });
  }

  async create({
    customer_id,
    product_id,
    assigned_by,
  }: CreatePurchaseProps): Promise<Purchase> {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!productExists) {
      throw new Error('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        assigned_by,
        customer_id,
        product_id,
      },
    });

    return purchase;
  }
}
