export default {
  Query: {
    datasources: (_, __, { dataSources }) => dataSources.dplsink.getFileList(),
  },
};
