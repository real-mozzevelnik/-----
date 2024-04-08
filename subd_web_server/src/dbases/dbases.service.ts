/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';

export interface Base {
  name: string;
  host: string;
  port: string;
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
      this.bases.push({
        name: nameBase,
        host: hostBase,
        port: portBase,
      });
    }
  }

  addBase(name: string, host: string, port: string): Base[] {
    this.bases.push({ name, host, port });
    const file = createWriteStream('dataBase.txt', { flags: 'a' });
    file.write(name + ' ' + host + ' ' + port + '\n');
    return this.bases;
  }

  deleteBase(Deletename: string) {
    const file1 = createWriteStream('data.txt');
    file1.write('');

    this.bases.splice(
      this.bases.findIndex(({ name }) => name === Deletename),
      1,
    );
    const file = createWriteStream('data.txt', { flags: 'a+' });
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
}
