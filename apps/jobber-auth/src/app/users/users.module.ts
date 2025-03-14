import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
