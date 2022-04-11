import { Field, ObjectType } from '@nestjs/graphql';

import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => Student)
  student!: Student;
  student_id!: string;

  @Field(() => Course)
  course!: Course;
  course_id!: string;

  @Field(() => Date, {
    nullable: true,
  })
  canceled_at!: Date;

  @Field(() => Date)
  assigned_at!: Date;
}
