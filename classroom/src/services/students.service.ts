import { Injectable } from '@nestjs/common';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByid(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
