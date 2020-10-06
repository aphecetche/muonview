"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var dotenv_1 = __importDefault(require("dotenv"));
var DataSourceLocalFile_1 = __importDefault(require("./DataSourceLocalFile"));
var DataSourceEnvelop_1 = __importDefault(require("./DataSourceEnvelop"));
var resolvers_1 = __importDefault(require("./resolvers"));
var path_1 = require("path");
var fs_1 = __importDefault(require("fs"));
var typeDefs = apollo_server_1.gql(fs_1["default"].readFileSync(path_1.resolve(__dirname, "./schema.graphql"), { encoding: "utf8" }));
dotenv_1["default"].config();
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers_1["default"],
    dataSources: function () { return ({
        localFiles: new DataSourceLocalFile_1["default"]("/Users/laurent/tmp", "dpl"),
        envelops: new DataSourceEnvelop_1["default"](process.env.MAPPING_API || "https://localhost:8080/v2")
    }); }
});
server.listen({ port: process.env.PORT || 4321 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDEA7 server ready at " + url);
});
