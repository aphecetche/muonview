"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const dotenv_1 = __importDefault(require("dotenv"));
const DataSourceLocalFile_1 = __importDefault(require("./DataSourceLocalFile"));
const DataSourceEnvelop_1 = __importDefault(require("./DataSourceEnvelop"));
const resolvers_1 = __importDefault(require("./resolvers"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const combineSchemas = (schemaDir = "schema") => {
    const schemaFiles = fs_1.default
        .readdirSync(path_1.resolve(schemaDir))
        .filter((file) => file.indexOf(".graphql") > 0);
    const schema = schemaFiles
        .map((file) => fs_1.default
        .readFileSync(path_1.resolve(`${schemaDir}/${file}`), {
        encoding: "utf8",
    })
        .toString())
        .join();
    return apollo_server_1.gql(schema);
};
const typeDefs = combineSchemas();
dotenv_1.default.config();
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default,
    dataSources: () => ({
        localFiles: new DataSourceLocalFile_1.default("/Users/laurent/tmp", "dpl"),
        envelops: new DataSourceEnvelop_1.default(process.env.MAPPING_API || "http://localhost:8080/"),
    }),
});
server.listen({ port: process.env.PORT || 4321 }).then(({ url }) => {
    console.log(`🚧 server ready at ${url}`);
});
