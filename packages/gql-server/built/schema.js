"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\"\"\"\nA DataSource can be anything that can provide data to mchview\n\"\"\"\ntype DataSource {\n        kind: DataSourceType!\n        name: String!\n        sha256: String!\n}\n\nenum DataSourceType {\n  CCDB\n  DPLSINK\n}\n\ntype Query {\n  allDataSources() {\n  }\n}\n"], ["\n\"\"\"\nA DataSource can be anything that can provide data to mchview\n\"\"\"\ntype DataSource {\n        kind: DataSourceType!\n        name: String!\n        sha256: String!\n}\n\nenum DataSourceType {\n  CCDB\n  DPLSINK\n}\n\ntype Query {\n  allDataSources() {\n  }\n}\n"])));
exports["default"] = typeDefs;
var templateObject_1;
