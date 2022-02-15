import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../users/entities/User';

@ObjectType()
class Pet {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  user_id: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

export { Pet };
