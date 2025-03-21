import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractSchema } from '@jobber/graphql';
@ObjectType()
export class User extends AbstractSchema {
  @Field()
  email: string;
}
