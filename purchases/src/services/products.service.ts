import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';
import slugify from 'slugify';

type CreateProductProps = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<any> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ title }: CreateProductProps): Promise<Product> {
    const slug = slugify(title, { lower: true });

    const slugExists = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (slugExists) {
      throw new Error('Product already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
