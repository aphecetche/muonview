import * as Types from "./src/generated/graphql";

const resolvers: Types.Resolvers = {
  Query: {
    datasources: (_, __, { dataSources }) =>
      dataSources.localFiles.getFileList(),

    datasource: (_, { id }, { dataSources }) =>
      dataSources.localFiles.getFileById({ id }),

    envelopDePlane: (
      _,
      { deid, bending }: Types.DePlaneId,
      { dataSources }: any
    ): Types.Envelop => {
      return dataSources.envelops.getEnvelopDePlane(deid, bending);
    },

    envelopDePlaneDualSampas: (
      _: any,
      { deid, bending }: Types.DePlaneId,
      { dataSources }: any
    ): Array<Types.Envelop> => {
      return dataSources.envelops.getEnvelopDePlaneDualSampas(deid, bending);
    },
  },
};
export default resolvers;
