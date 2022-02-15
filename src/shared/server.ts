import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UsersResolver } from '../modules/users/graphql/resolvers/UsersResolver';
import { PetsResolver } from '../modules/pets/graphql/resolvers/PetsResolver';

async function init() {
  const app = express();
  const port = 4010;

  const schema = await buildSchema({
    resolvers: [UsersResolver, PetsResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀`);
  });
}

init();
