"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_caching_1 = require("apollo-server-caching");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Types = __importStar(require("./__generated__/typedefs"));
const createHashFromFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const hash = crypto_1.default.createHash("sha1");
        let r = null;
        const fd = fs_1.default.createReadStream(filePath).on("end", () => {
            hash.end();
            r = hash.digest("hex");
            resolve(r);
        });
        fd.pipe(hash);
    });
});
const getFileList = (dir, regexp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const reg = new RegExp(regexp);
        const filelist = new Set();
        fs_1.default.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            }
            const selected = files
                .map((file) => path_1.default.join(dir, file))
                .filter((file) => reg.test(file));
            const hashes = selected.map((file) => __awaiter(void 0, void 0, void 0, function* () { return createHashFromFile(file); }));
            Promise.all(hashes).then((f) => {
                f.map((a, i) => filelist.add({
                    fullpath: selected[i],
                    sha256: a,
                }));
                resolve(filelist);
            });
        });
    });
});
class DataSourceLocalFile {
    constructor(dir, regexp) {
        this.dir = dir;
        this.regexp = regexp;
    }
    initialize({ cache }) {
        this.cache = cache || new apollo_server_caching_1.InMemoryLRUCache();
    }
    getFileList() {
        return __awaiter(this, void 0, void 0, function* () {
            //FIXME: should check cache first
            const files = yield getFileList(this.dir, this.regexp);
            const ofiles = Array.from(files).map((f) => this.fileReducer(f));
            return Array.from(ofiles);
        });
    }
    getFileById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.getFileList();
            const f = files.filter((f) => f.id === id);
            return f[0];
        });
    }
    fileReducer(file) {
        //FIXME: should get the format from the file itself,
        // not hard-code it
        if (file) {
            return {
                id: file.sha256,
                name: file.fullpath,
                format: Types.DataSourceType.Dplsink,
                what: "zob-digits",
            };
        }
        else {
            return {
                id: "unknown",
                name: "",
                format: Types.DataSourceType.Dplsink,
                what: "digits",
            };
        }
    }
}
exports.default = DataSourceLocalFile;
