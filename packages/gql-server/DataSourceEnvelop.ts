import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import * as Types from "./src/generated/graphql";

export default class DataSourceEnvelop extends RESTDataSource {
  constructor(url: string) {
    super();
    this.baseURL = url;
  }

  async getEnvelopDePlane(
    deid: number,
    bending: boolean
  ): Promise<Types.Envelop> {
    // const req = `deid=${deid}&bending=${bending}`;
    // const response = await this.get("v2/degeo", req);
    const response = await this.get("v2/degeo",{ "deid": deid, "bending": bending })
    const bendingString = bending ? "bending" : "non-bending";
    const id = `de-${deid}-${bendingString}`;
    return this.envelopReducer(response, id);
  }

  envelopReducer(response: any, id: string): Types.Envelop {
    return {
      id,
      size: { sx: response.sx, sy: response.sy },
      center: { x: response.x, y: response.y },
      vertices: response.vertices,
    };
  }

  // willSendRequest(request: RequestOptions) {
  // }
}
