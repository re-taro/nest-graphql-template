import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserCreateInput, UserUpdateInput } from './user.input';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => [User], { name: 'cleanUsers' })
  async deleteAll(): Promise<User[]> {
    return this.userService.deleteAll();
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('data') data: UserCreateInput): Promise<User> {
    return this.userService.create(data);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(@Args('data') data: UserUpdateInput): Promise<User> {
    return this.userService.update(data);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async delete(@Args('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
