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
    const response = await this.get("v2/degeo", {
      deid: deid,
      bending: bending,
    });
    const bendingString = bending ? "bending" : "non-bending";
    const id = `de-${deid}-${bendingString}`;
    return this.envelopReducer(response, id);
  }

  envelopReducer(response: any, id: string): Types.Envelop {
    const shift: Types.Vertex = { x: response.sx / 2, y: response.sy / 2 };
    const x = response.x - shift.x;
    const y = response.y - shift.y;
    return {
      id,
      size: { sx: response.sx, sy: response.sy },
      center: { x: x, y: y },
      vertices: response.vertices.map((v: Types.Vertex) => ({
        x: v.x - x,
        y: v.y - y,
      })),
    };
  }

  // willSendRequest(request: RequestOptions) {
  // }
}
