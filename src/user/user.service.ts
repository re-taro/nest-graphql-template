import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput, UserUpdateInput } from './user.input';
import { User } from './user.model';

@Injectable()
export class UserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(data: UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      data: { name: data.name },
      where: { id: data.id },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async deleteAll(): Promise<User[]> {
    await this.prisma.user.deleteMany({});
    return [];
  }
}
