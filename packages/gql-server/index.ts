import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import DataSourceLocalFile from "./DataSourceLocalFile";

import resolvers from "./resolvers";
import { resolve } from "path";
import fs from "fs";

const typeDefs = gql(
  fs.readFileSync(resolve(__dirname, "./schema.graphql"), { encoding: "utf8" })
);

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    //dplsink: new DataSourceLocalFile("/Users/laurent/tmp", "(dpl.*)(.bin$)"),
    dplsink: new DataSourceLocalFile("/Users/laurent/tmp", "dpl"),
  }),
});

server.listen({ port: process.env.PORT || 4321 }).then(({ url }) => {
  console.log(`🚧 server ready at ${url}`);
});
