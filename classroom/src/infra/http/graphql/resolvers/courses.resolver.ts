import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from 'infra/http/guards/authorization.guard';
import { CoursesService } from 'services/courses.service';

import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.findAll();
  }
}
