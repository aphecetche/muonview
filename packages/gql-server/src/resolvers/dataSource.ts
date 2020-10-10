import * as Types from "__generated__/typedefs";

export const resolvers: Types.Resolvers = {
  Query: {
    datasources: (_, __, { dataSources }) =>
      dataSources.localFiles.getFileList(),

    datasource: (_, { id }, { dataSources }) =>
      dataSources.localFiles.getFileById({ id }),
  },
};
