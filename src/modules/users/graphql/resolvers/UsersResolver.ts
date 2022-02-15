import { hash } from 'bcrypt';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { prisma } from '../../../../database/prismaClient';
import { Pet } from '../../../pets/entities/Pet';
import { User } from '../../entities/User';

@Resolver(User)
class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('first_name') first_name: string,
    @Arg('last_name') last_name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const passwordHashed = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: passwordHashed,
      },
    });

    return user;
  }

  @FieldResolver(() => [Pet])
  async pets(@Root() root: User): Promise<Pet[]> {
    return prisma.pet.findMany({
      where: {
        user_id: root.id,
      },
    });
  }
}

export { UsersResolver };
