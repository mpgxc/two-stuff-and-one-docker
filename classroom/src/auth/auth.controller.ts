import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../infra/databases/prisma/prisma.service';
import { AuthorizationGuard } from '../infra/http/guards/authorization.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 12;
  }
}
