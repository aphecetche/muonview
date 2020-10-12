"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        datasources: (_, __, { dataSources }) => dataSources.localFiles.getFileList(),
        datasource: (_, { id }, { dataSources }) => dataSources.localFiles.getFileById({ id }),
    },
};
