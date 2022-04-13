import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByid(id: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async findByAuthId(auth_user_id: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: {
        auth_user_id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }
}
