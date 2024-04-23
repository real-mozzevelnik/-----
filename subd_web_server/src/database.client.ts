/* eslint-disable @typescript-eslint/ban-types */
import {
  Mutex,
  //   MutexInterface,
  //   Semaphore,
  //SemaphoreInterface,
  // withTimeout,
} from 'async-mutex';
import { randomUUID } from 'crypto';
import { Socket } from 'net';

export class DBClient {
  host: string;
  port: string;
  #client: Socket;
  #mutex: Mutex;

  constructor(host: string, port: string) {
    this.host = host;
    this.port = port;
    this.#mutex = new Mutex();
  }

  async Connect() {
    this.#client = new Socket();
    let isConnected: boolean = false;
    this.#client.connect(
      { host: this.host, port: parseInt(this.port) },
      function () {
        isConnected = true;
      },
    );

    while (!isConnected) {
      await this.#delay(100);
    }
  }

  async SqlStatement(sql: string) {
    const message = this.#configureMessage('sql_statement', {
      sql_statement: sql,
    });
    const response = await this.#send(message);

    return response;
  }

  async Info() {
    const message = this.#configureMessage('db_info', { test: 'test' });
    const response = await this.#send(message);
    return response;
  }

  #delay(ms: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async #send(message: Buffer): Promise<Object> {
    const release = await this.#mutex.acquire();

    try {
      this.#client.write(message);

      const readResult = [];
      let data = this.#client.read();
      while (data == null) {
        await this.#delay(100);
        data = this.#client.read();
      }
      while (data != null) {
        readResult.push(data);
        data = this.#client.read();
      }

      return JSON.parse(Buffer.concat(readResult).toString());
    } catch (e) {
      return {} as Object;
    } finally {
      release();
    }
  }

  #configureMessage(action: string, data: Object): Buffer {
    const message = {
      action: action,
      data: data,
      reqId: randomUUID(),
    };

    return Buffer.from(JSON.stringify(message) + '\n');
  }
}
