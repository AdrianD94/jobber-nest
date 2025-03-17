import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { LoginInput } from '../dto/login.input';
import { GqlContext } from '@jobber/nestjs';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext
  ) {
    console.log(context);
    return this.authService.login(loginInput, context.res);
  }
}
