import { AbstractSchema } from '@jobber/graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job extends AbstractSchema {
  @Field()
  name: string;

  @Field()
  size: number;

  @Field()
  status: string;

  @Field()
  started: Date;

  @Field({ nullable: true })
  ended?: Date;

  @Field()
  completed: number;
}
