"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const envelop_1 = require("./resolvers/envelop");
const dataSource_1 = require("./resolvers/dataSource");
const resolvers = lodash_1.merge(envelop_1.resolvers, dataSource_1.resolvers);
exports.default = resolvers;
