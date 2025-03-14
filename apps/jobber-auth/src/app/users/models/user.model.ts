import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractSchema } from '@jobber/nestjs';
@ObjectType()
export class User extends AbstractSchema {
  @Field()
  email: string;
}
