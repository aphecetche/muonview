import { RESTDataSource,RequestOptions } from "apollo-datasource-rest";
import * as Types from "./src/generated/graphql";

export default class DataSourceEnvelop extends RESTDataSource {
    constructor(url: string) {
        super();
        this.baseURL = url;
    }

    async getEnvelop({id} : {id:Types.InputElementId}): Promise<Types.Envelop> {
        console.log("id=",JSON.stringify(id))
            console.log("id.deid=",id.deid)
            const req = `deid=${id.deid}&bending=false`
            console.log("req=",req)
            const response = await this.get('v2/degeo',req);
        return this.envelopReducer(response)
    }

    envelopReducer(response:any) : Types.Envelop {
        console.log("response=",response)
        // const id = { deid: response.id,
        //     bending: response.bending }
       const id = { deid: response.id}
        return {
            id,
                "size": {"sx":response.sx, "sy":response.sy},
                "center": {"x":response.x, "y":response.y},
                "vertices": response.vertices
        }

    }

    willSendRequest(request: RequestOptions) {
        console.log("request=",request)
    }
}
