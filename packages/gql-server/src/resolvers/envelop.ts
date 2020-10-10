import * as Types from "__generated__/typedefs";

export const resolvers: Types.Resolvers = {
  Query: {
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

  // envelopPads(padids: [DetElecChId]!): [Envelop]!
};

