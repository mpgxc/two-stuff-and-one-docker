import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

type CreateCustomerProps = Partial<Customer>;

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<any> {
    return this.prisma.customer.findMany();
  }

  async findById(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async findByAuthId(auth_user_id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: {
        auth_user_id,
      },
    });
  }

  async create({ auth_user_id }: CreateCustomerProps): Promise<Customer> {
    return this.prisma.customer.create({
      data: {
        auth_user_id,
      },
    });
  }
}
