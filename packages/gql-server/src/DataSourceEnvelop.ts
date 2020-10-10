import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import * as Types from "__generated__/typedefs";

const computeBoundingBox = (
envelop: Types.Envelop
): { xmin: number; ymin: number; xmax: number; ymax: number } => {
  let xmin: number = Number.MAX_SAFE_INTEGER;
  let ymin: number = Number.MAX_SAFE_INTEGER;
  let xmax: number = -xmin;
  let ymax: number = -ymin;
  envelop?.vertices?.map((v) => {
    xmin = Math.min(xmin, v?.x || 0.0);
    ymin = Math.min(ymin, v?.y || 0.0);
    xmax = Math.max(xmax, v?.x || 0.0);
    ymax = Math.max(ymax, v?.y || 0.0);
  });
  return { xmin, ymin, xmax, ymax };
};
export default class DataSourceEnvelop extends RESTDataSource {
  constructor(url: string) {
    super();
    this.baseURL = url;
  }

  async getBoundingBoxDePlane(
    deid: number,
    bending: boolean
  ): Promise<Types.BoundingBox> {
    console.log("getBoundingBoxDePlane deid=",deid,"bending=",bending)
    const response: Types.Envelop = await this.get("v2/degeo", {
      deid: deid,
      bending: bending,
    });
    return computeBoundingBox(response)
  }


  async getEnvelopDePlane(
    deid: number,
    bending: boolean
  ): Promise<Types.Envelop> {
    console.log("getEnvelopDePlane deid=",deid,"bending=",bending)
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
    const bendingString = bending ? "bending" : "non-bending";
    const id = `dualsampas-${deid}-${bendingString}`;
    return response.map((r: Types.Envelop) => ({
      id: `${id}-ds-${r.id}`,
      vertices: r.vertices 
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
