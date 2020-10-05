import { DataSource } from "apollo-datasource";
import { InMemoryLRUCache, KeyValueCache } from "apollo-server-caching";
import crypto from "crypto";
import fs from "fs";
import path from "path";

interface IDataSource {
  //__typename: "DataSource";
  id: string;
  what: string;
  format: DataSourceType;
  name: string;
}

const enum DataSourceType {
  CCDB = "CCDB",
  DPLSINK = "DPLSINK",
}

interface FileInfo {
  fullpath: string;
  sha256: string;
}

const createHashFromFile = async (filePath): Promise<string> =>
  new Promise<string>((resolve) => {
    const hash = crypto.createHash("sha1");
    let r = null;
    const fd = fs.createReadStream(filePath).on("end", () => {
      hash.end();
      r = hash.digest("hex");
      resolve(r);
    });
    fd.pipe(hash);
  });

const getFileList = async (
  dir: string,
  regexp: string
): Promise<Set<FileInfo>> => {
  return new Promise((resolve, reject) => {
    const reg = new RegExp(regexp);
    const filelist = new Set<FileInfo>();
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      const selected = files
        .map((file) => path.join(dir, file))
        .filter((file) => reg.test(file));
      const hashes = selected.map(async (file) => createHashFromFile(file));
      Promise.all(hashes).then((f) => {
        f.map((a, i) =>
          filelist.add({
            fullpath: selected[i],
            sha256: a,
          })
        );
        resolve(filelist);
      });
    });
  });
};

export default class DataSourceLocalFile implements DataSource {
  dir: string;
  regexp: string;
  files: Promise<Set<FileInfo>>;
  cache: KeyValueCache;

  constructor(dir: string, regexp: string) {
    this.dir = dir;
    this.regexp = regexp;
  }

  initialize({ cache }: { cache: KeyValueCache }): void {
    this.cache = cache || new InMemoryLRUCache();
  }

  async getFileList(): Promise<Array<IDataSource>> {
    //FIXME: should check cache first
    const files = await getFileList(this.dir, this.regexp);
    const ofiles = Array.from(files).map((f) => this.fileReducer(f));
    return Array.from(ofiles);
  }

  async getFileById({ id }: { id: string }): Promise<IDataSource> {
    const files = await this.getFileList();
    console.log("getFileById:files=", files);
    const f = files.filter((f) => f.id === id);
    console.log("getFileById[id=", id, "]=", f);
    return f[0];
  }

  fileReducer(file: FileInfo): IDataSource {
    //FIXME: should get the format from the file itself,
    // not hard-code it
    if (file) {
      return {
        id: file.sha256,
        name: file.fullpath,
        format: DataSourceType.DPLSINK,
        what: "zob-digits"
      };
    } else {
      return {
        id: "unknown",
        name: "",
        format: DataSourceType.DPLSINK,
        what: "digits"
      };
    }
  }
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
}
