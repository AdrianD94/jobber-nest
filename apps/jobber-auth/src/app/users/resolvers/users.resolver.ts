import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { UserInput } from '../dto/user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuards } from '../../auth/guards/gql.auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { TokenPayload } from '../../auth/interfaces/token-payload.interface';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuards)
  @Query(() => [User], { name: 'users' })
  async getUsers(@CurrentUser() { userId }: TokenPayload): Promise<User[]> {
    console.log(userId);
    return this.usersService.getUsers();
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.usersService.createUser(data);
  }
}
