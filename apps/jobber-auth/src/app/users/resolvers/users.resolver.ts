import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { UserInput } from '../dto/user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.usersService.createUser(data);
  }
}
