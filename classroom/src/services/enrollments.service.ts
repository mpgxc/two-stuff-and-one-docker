import { Injectable } from '@nestjs/common';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.enrollment.findMany({
      where: {
        canceled_at: null,
      },
      orderBy: {
        assigned_at: 'desc',
      },
    });
  }

  async findAllByStudendtId(student_id: string) {
    return this.prisma.enrollment.findMany({
      where: {
        student_id,
        canceled_at: null,
      },
      orderBy: {
        assigned_at: 'desc',
      },
    });
  }
}
