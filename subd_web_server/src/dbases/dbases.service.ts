/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { DBClient } from '../database.client';

export interface Base {
  name: string;
  host: string;
  port: string;
  db: DBClient;
}
@Injectable()
export class BasesService {
  private bases: Base[];
  constructor() {
    this.bases = [];
    const fs = require('fs');
    const fileContents = fs.readFileSync('dataBase.txt', 'utf8');
    const str = fileContents.split('\n');
    for (let i = 0; i < str.length - 1; i++) {
      const Base = str[i].split(' ');
      const nameBase = Base[0];
      const hostBase = Base[1];
      const portBase = Base[2];
      const db = new DBClient(hostBase, portBase);
      db.Connect();
      this.bases.push({
        name: nameBase,
        host: hostBase,
        port: portBase,
        db: db,
      });
    }
  }

  addBase(name: string, host: string, port: string): Base[] {
    console.log(name);
    const db = new DBClient(host, port);
    const nameDb = name;
    db.Connect();
    const index = this.bases.findIndex(({ name }) => name === nameDb);
    // console.log(index);
    if (index === -1) {
      this.bases.push({ name, host, port, db });
      const file = createWriteStream('dataBase.txt', { flags: 'a' });
      file.write(name + ' ' + host + ' ' + port + '\n');
      return this.bases;
    } else {
      return null;
    }
  }

  deleteBase(Deletename: string) {
    const file1 = createWriteStream('dataBase.txt');
    file1.write('');
    this.bases.splice(
      this.bases.findIndex(({ name }) => name === Deletename),
      1,
    );
    const file = createWriteStream('dataBase.txt', { flags: 'a+' });
    for (const i in this.bases)
      file.write(
        this.bases[i].name +
          ' ' +
          this.bases[i].host +
          ' ' +
          this.bases[i].port +
          '\n',
      );
  }

  getBases() {
    return this.bases;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getInfo(nameDb: string) {
    const index = this.bases.findIndex(({ name }) => name === nameDb);

    const databaseInfo = await this.bases[index].db.Info();

    return JSON.stringify(databaseInfo, null, 4);
  }

  async getDataFromBd(nameDb: string, nameTable: string) {
    console.log(nameTable);
    const index = this.bases.findIndex(({ name }) => name === nameDb);

    let query = '';
    if (nameTable === 'users1') {
      query = 'age, job, name';
    } else if (nameTable === 'users') query = 'age, email, job, name, phone';

    const databaseInfo = await this.bases[index].db.SqlStatement(
      `select ${query} from ${nameTable};`,
    );

    return JSON.stringify(databaseInfo, null, 4);
  }

  async getQuery(nameDb: string, query: string) {
    console.log(query);
    const index = this.bases.findIndex(({ name }) => name === nameDb);
    const databaseInfo = await this.bases[index].db.SqlStatement(`${query}`);
    return JSON.stringify(databaseInfo, null, 4);
  }
}
