import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class AbstractSchema {
  @Field(() => ID)
  id: number;
}
