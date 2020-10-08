import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import * as Types from "./src/generated/graphql";

const shiftVertex = (v: Types.Vertex, s: Types.Offset): Types.Vertex => {
    return { x: v.x + s.x, y: v.y + s.y };
  }

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
    const shift: Types.Vertex = { x: response.sx / 2, y: response.sy / 2 };
    const center = {
      x: response.x - shift.x,
      y: response.y - shift.y,
    };
    return {
      id,
      size: { sx: response.sx, sy: response.sy },
      center: center,
      vertices: response.vertices.map((v: Types.Vertex) =>
        shiftVertex(v, center)
      ),
    };
  }

  async getEnvelopDePlaneDualSampas(
    deid: number,
    bending: boolean
  ): Promise<Types.Envelop> {
    const response = await this.get("v2/dualsampas", {
      deid: deid,
      bending: bending,
    });
    console.log(response);
    const bendingString = bending ? "bending" : "non-bending";
    const id = `dualsampas-${deid}-${bendingString}`;
    return {
        id,
        center: { x: 0, y: 0},
        size: { sx: 0, sy: 0},
        vertices: null
    }
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
