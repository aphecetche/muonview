import { Envelop, Resolvers } from "./src/generated/graphql"

const  resolvers: Resolvers = {
  Query: {
    datasources: (_, __, { dataSources }) => dataSources.localFiles.getFileList(),
    datasource: (_, { id }, { dataSources }) =>
      dataSources.localFiles.getFileById({ id }),
    envelopDePlane: (_,{deid,bending}:{deid:number,bending:boolean},{dataSources}:{dataSources:any}) : Envelop =>
    {
        return dataSources.envelops.getEnvelopDePlane(deid, bending);
      }
  },
};
export default resolvers
