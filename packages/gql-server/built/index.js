"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var schema_1 = __importDefault(require("./schema"));
new apollo_server_1.ApolloServer({ typeDefs: schema_1["default"] });
