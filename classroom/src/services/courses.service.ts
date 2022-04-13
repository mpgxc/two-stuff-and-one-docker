import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from '@prisma/client';

import { PrismaService } from 'infra/databases/prisma/prisma.service';
import slugify from 'slugify';

type CreateCourseProps = {
  title: string;
};
@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByid(id: string): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async create({ title }: CreateCourseProps): Promise<Course | null> {
    const slug = slugify(title, { lower: true });

    const courseExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseExists) {
      throw new ConflictException('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
