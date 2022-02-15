import { Field, ID, ObjectType } from 'type-graphql';
import { Pet } from '../../pets/entities/Pet';

@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];
}

export { User };
