import { Resolvers } from "./src/generated/graphql"

const  resolvers: Resolvers = {
  Query: {
    datasources: (_, __, { dataSources }) => dataSources.localFiles.getFileList(),
    datasource: (_, { id }, { dataSources }) =>
      dataSources.localFiles.getFileById({ id }),
    envelop: (_,{ id},{dataSources}) =>
    dataSources.envelops.getEnvelop({id})
  },
  ElementId: {
      __resolveType(obj,context,info) { 
          return obj.__typename
          }
  }
};

export default resolvers
