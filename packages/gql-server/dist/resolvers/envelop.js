"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        boundingBoxDePlane: (_, { deid, bending }, { dataSources }) => {
            return dataSources.envelops.getBoundingBoxDePlane(deid, bending);
        },
        envelopDePlane: (_, { deid, bending }, { dataSources }) => {
            return dataSources.envelops.getEnvelopDePlane(deid, bending);
        },
        envelopDePlaneDualSampas: (_, { deid, bending }, { dataSources }) => {
            return dataSources.envelops.getEnvelopDePlaneDualSampas(deid, bending);
        },
    },
};
