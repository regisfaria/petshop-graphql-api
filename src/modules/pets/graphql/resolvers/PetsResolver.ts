import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { prisma } from '../../../../database/prismaClient';
import { User } from '../../../users/entities/User';
import { Pet } from '../../entities/Pet';

@Resolver(Pet)
class PetsResolver {
  @Query(() => [Pet])
  async getPets(): Promise<Pet[]> {
    return prisma.pet.findMany();
  }

  @Mutation(() => Pet)
  async createPet(
    @Arg('name') name: string,
    @Arg('user_id') user_id: string,
  ): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        name,
        user_id,
      },
    });

    return pet;
  }

  @FieldResolver(() => [User])
  async user(@Root() root: Pet): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        id: root.user_id,
      },
    });
  }
}

export { PetsResolver };
