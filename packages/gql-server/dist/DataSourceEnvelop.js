"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const computeBoundingBox = (envelop) => {
    var _a;
    let xmin = Number.MAX_SAFE_INTEGER;
    let ymin = Number.MAX_SAFE_INTEGER;
    let xmax = -xmin;
    let ymax = -ymin;
    (_a = envelop === null || envelop === void 0 ? void 0 : envelop.vertices) === null || _a === void 0 ? void 0 : _a.map((v) => {
        xmin = Math.min(xmin, (v === null || v === void 0 ? void 0 : v.x) || 0.0);
        ymin = Math.min(ymin, (v === null || v === void 0 ? void 0 : v.y) || 0.0);
        xmax = Math.max(xmax, (v === null || v === void 0 ? void 0 : v.x) || 0.0);
        ymax = Math.max(ymax, (v === null || v === void 0 ? void 0 : v.y) || 0.0);
    });
    return { xmin, ymin, xmax, ymax };
};
class DataSourceEnvelop extends apollo_datasource_rest_1.RESTDataSource {
    constructor(url) {
        super();
        this.baseURL = url;
    }
    getBoundingBoxDePlane(deid, bending) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getBoundingBoxDePlane deid=", deid, "bending=", bending);
            const response = yield this.get("v2/degeo", {
                deid: deid,
                bending: bending,
            });
            return computeBoundingBox(response);
        });
    }
    getEnvelopDePlane(deid, bending) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getEnvelopDePlane deid=", deid, "bending=", bending);
            const response = yield this.get("v2/degeo", {
                deid: deid,
                bending: bending,
            });
            const bendingString = bending ? "bending" : "non-bending";
            const id = `de-${deid}-${bendingString}`;
            return {
                id,
                vertices: response.vertices
            };
        });
    }
    getEnvelopDePlaneDualSampas(deid, bending) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get("v2/dualsampas", {
                deid: deid,
                bending: bending,
            });
            const bendingString = bending ? "bending" : "non-bending";
            const id = `dualsampas-${deid}-${bendingString}`;
            return response.map((r) => ({
                id: `${id}-ds-${r.id}`,
                vertices: r.vertices
            }));
        });
    }
}
exports.default = DataSourceEnvelop;
