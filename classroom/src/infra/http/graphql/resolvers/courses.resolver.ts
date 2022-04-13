import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from 'infra/http/guards/authorization.guard';
import { AuthUser, CurrentUser } from 'infra/http/guards/current-user';
import { CoursesService } from 'services/courses.service';
import { EnrollmentsService } from 'services/enrollments.service';
import { StudentsService } from 'services/students.service';

import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.findAll();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.findByAuthId(user.sub);

    const enrollment = await this.enrollmentsService.findByCourseAndStudentId({
      course_id: id,
      student_id: student?.id as string,
    });

    return this.coursesService.findByid(enrollment?.course_id as string);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') { title }: CreateCourseInput) {
    return this.coursesService.create({ title });
  }
}
