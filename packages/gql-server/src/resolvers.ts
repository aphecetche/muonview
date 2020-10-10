import * as Types from "__generated__/typedefs";
import { merge } from "lodash"
import { resolvers as envelopResolvers } from "./resolvers/envelop"
import { resolvers as dataSourceResolvers } from "./resolvers/dataSource"

const resolvers: Types.Resolvers = merge(envelopResolvers,dataSourceResolvers)

export default resolvers;
