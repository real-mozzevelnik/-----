import { time } from 'console';
import { randomUUID } from 'crypto';
import { Socket } from 'net';


export class DBClient {
    host: string;
    port: string;
    client: Socket;

    constructor(host: string, port: string) {
        this.host = host;
        this.port = port;
    }

    async Connect() {
        this.client = new Socket();
        let isConnected: boolean = false;
        this.client.connect({host: this.host, port: parseInt(this.port)}, function() {
            isConnected = true;
        });

        while (!isConnected) {
            await this.#delay(100);
        }
    }

    

    async SqlStatement(sql: string) {
        const message = this.#configureMessage("sql_statement", {"sql_statement": sql});
        const response = await this.#send(message);

        return response;
    }

    async Info() {
        const message = this.#configureMessage("db_info", {"test": "test"});
        const response = await this.#send(message);

        return response;
    }

    #delay(ms: number): Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async #send(message: Buffer) {
        this.client.write(message);

        let data = this.client.read();
        while (data == null) {
            await this.#delay(100);
            data = this.client.read();
        }

        return JSON.parse(data.toString());
    }

    #configureMessage(action: string, data: Object): Buffer {
        let message = {
            action: action,
            data: data,
            reqId: randomUUID(),
        };

        return Buffer.from(JSON.stringify(message) + "\n");
    }
}