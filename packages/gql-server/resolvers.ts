import * as Types from "./src/__generated__/graphql";

const resolvers: Types.Resolvers = {
  Query: {
    datasources: (_, __, { dataSources }) =>
      dataSources.localFiles.getFileList(),

    datasource: (_, { id }, { dataSources }) =>
      dataSources.localFiles.getFileById({ id }),

    boundingBoxDePlane: (
      _,
      { deid, bending }: Types.DePlaneId,
      { dataSources }: any
    ): Types.BoundingBox => {
      return dataSources.envelops.getBoundingBoxDePlane(deid, bending);
    },


    envelopDePlane: (
      _,
      { deid, bending }: Types.DePlaneId,
      { dataSources }: any
    ): Types.Envelop => {
      return dataSources.envelops.getEnvelopDePlane(deid, bending);
    },

    envelopDePlaneDualSampas: (
      _,
      { deid, bending }: Types.DePlaneId,
      { dataSources }: any
    ): Array<Types.Envelop> => {
      return dataSources.envelops.getEnvelopDePlaneDualSampas(deid, bending);
    },
  },
};
export default resolvers;
