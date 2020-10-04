export default {
  Query: {
    datasources: (_, __, { dataSources }) => dataSources.dplsink.getFileList(),
    datasource: (_, { id }, { dataSources }) =>
      dataSources.dplsink.getFileById({ id }),
  },
};
