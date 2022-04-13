import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

type CreateStudentProps = {
  auth_user_id: string;
};

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ auth_user_id }: CreateStudentProps): Promise<Student> {
    return this.prisma.student.create({
      data: {
        auth_user_id,
      },
    });
  }

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
    return this.prisma.student.findUnique({
      where: {
        auth_user_id,
      },
    });
  }
}
