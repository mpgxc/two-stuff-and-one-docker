import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Enrollment } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';

type FindByCourseAndStudentIdProps = {
  course_id: string;
  student_id: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCourseAndStudentId({
    course_id,
    student_id,
  }: FindByCourseAndStudentIdProps): Promise<Enrollment | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id,
          course_id,
        },
      },
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return enrollment;
  }

  async findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        canceled_at: null,
      },
      orderBy: {
        assigned_at: 'desc',
      },
    });
  }

  async findAllByStudendtId(student_id: string): Promise<Enrollment[]> {
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
