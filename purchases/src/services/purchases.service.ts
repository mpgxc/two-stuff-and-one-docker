import { Injectable, NotFoundException } from '@nestjs/common';
import { Purchase } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';
import { KafkaService } from 'infra/messaging/kafka.service';

type CreatePurchaseProps = {
  product_id: string;
  customer_id: string;
  assigned_by: string;
};

type FindByCourseAndStudentIdProps = {
  product_id: string;
  customer_id: string;
};
@Injectable()
export class PurchasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}

  async listAll(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      orderBy: {
        assigned_by: 'desc',
      },
    });
  }

  async findByCourseAndStudentId({
    customer_id,
    product_id,
  }: FindByCourseAndStudentIdProps): Promise<Purchase | null> {
    const enrollment = await this.prisma.purchase.findUnique({
      where: {
        customer_id_product_id: {
          customer_id,
          product_id,
        },
      },
    });

    return enrollment;
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
      throw new NotFoundException('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        assigned_by,
        customer_id,
        product_id,
      },
    });

    this.kafkaService.emit('purchases.create-purchase', {
      customer: {
        auth_user_id: assigned_by,
      },

      product: {
        id: product_id,
        title: productExists.title,
        slug: productExists.slug,
      },
    });

    return purchase;
  }
}
