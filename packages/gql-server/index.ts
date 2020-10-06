import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import DataSourceLocalFile from "./DataSourceLocalFile";
import DataSourceEnvelop from "./DataSourceEnvelop";

import resolvers from "./resolvers";
import { resolve } from "path";
import fs from "fs";

const combineSchemas = (schemaDir = "schema") => {
  const schemaFiles = fs
    .readdirSync(resolve(__dirname, schemaDir))
    .filter((file) => file.indexOf(".graphql") > 0);

  const schema = schemaFiles
    .map((file) =>
      fs
        .readFileSync(resolve(__dirname, `${schemaDir}/${file}`), {
          encoding: "utf8",
        })
        .toString()
    )
    .join();

  return gql(schema);
};

const typeDefs = combineSchemas();

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    localFiles: new DataSourceLocalFile("/Users/laurent/tmp", "dpl"),
    envelops: new DataSourceEnvelop(
      process.env.MAPPING_API || "http://localhost:8080/"
    ),
  }),
});

server.listen({ port: process.env.PORT || 4321 }).then(({ url }) => {
  console.log(`🚧 server ready at ${url}`);
});
