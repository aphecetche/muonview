"use strict";
exports.__esModule = true;
exports["default"] = {
    Query: {
        datasources: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return dataSources.localFiles.getFileList();
        },
        datasource: function (_, _a, _b) {
            var id = _a.id;
            var dataSources = _b.dataSources;
            return dataSources.localFiles.getFileById({ id: id });
        },
        envelop: function (_, _a, _b) {
            var id = _a.id;
            var dataSources = _b.dataSources;
            return dataSources.envelops.getEnvelop({ id: id });
        }
    }
};
