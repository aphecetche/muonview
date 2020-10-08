import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import * as Types from "./src/generated/graphql";

// const shiftVertex = (v: Types.Vertex, s: Types.Offset): Types.Vertex => {
//   return { x: v.x + s.x, y: v.y + s.y };
// };

export default class DataSourceEnvelop extends RESTDataSource {
  constructor(url: string) {
    super();
    this.baseURL = url;
  }

  async getEnvelopDePlane(
    deid: number,
    bending: boolean
  ): Promise<Types.Envelop> {
    console.log("v2/degeo deid=", deid, "bending=", bending);
    const response = await this.get("v2/degeo", {
      deid: deid,
      bending: bending,
    });
    const bendingString = bending ? "bending" : "non-bending";
    const id = `de-${deid}-${bendingString}`;
    return {
      id,
      vertices: response.vertices
    };
  }

  async getEnvelopDePlaneDualSampas(
    deid: number,
    bending: boolean
  ): Promise<Array<Types.Envelop>> {
    const response = await this.get("v2/dualsampas", {
      deid: deid,
      bending: bending,
    });
    console.log(response);
    const bendingString = bending ? "bending" : "non-bending";
    const id = `dualsampas-${deid}-${bendingString}`;
    return response.map((r: any) => ({
      id: `${id}-ds-${r.id}`,
      vertices: r.vertices /* FIXME: should shift here */,
    }));
  }

  //
  // cacheKey(id: string): string {
  //   return `dplsink-${this.dir}-${id}`;
  // }
  //
  // load(id: string): string {
  //   console.log("load:id=", id);
  //   return "zob";
  // }

  // async get(id: string, ttlInSeconds?: number): Promise<string> {
  //   const cacheDoc = await this.cache.get(this.cacheKey(id));
  //   if (cacheDoc) {
  //     return JSON.parse(cacheDoc);
  //   }
  //
  //   const doc = await this.load(id);
  //
  //   if (ttlInSeconds) {
  //     this.cache.set(this.cacheKey(id), JSON.stringify(doc), {
  //       ttl: ttlInSeconds,
  //     });
  //   }
  //
  //   return doc;
  // }

  // willSendRequest(request: RequestOptions) {
  // }
}
