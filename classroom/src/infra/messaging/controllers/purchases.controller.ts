import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CoursesService } from 'services/courses.service';
import { EnrollmentsService } from 'services/enrollments.service';
import { StudentsService } from 'services/students.service';

type Customer = {
  auth_user_id: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
};

type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

@Controller()
export class PurchasesController {
  constructor(
    private readonly coursesServcies: CoursesService,
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.create-purchase')
  async purchasesCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.findByAuthId(
      payload.customer.auth_user_id,
    );

    if (!student) {
      student = await this.studentsService.create({
        auth_user_id: payload.customer.auth_user_id,
      });
    }

    let course = await this.coursesServcies.findBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesServcies.create({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.create({
      student_id: student.id,
      course_id: course?.id as string,
      assigned_by: payload.customer.auth_user_id,
    });
  }
}
