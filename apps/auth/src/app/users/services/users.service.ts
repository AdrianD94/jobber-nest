import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma-clients/auth';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: { ...data, password: await hash(data.password, 10) },
    });
  }

  async getUser(data: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: data });
  }
}
