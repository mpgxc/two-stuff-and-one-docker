import { Injectable } from '@nestjs/common';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByid(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }
}
