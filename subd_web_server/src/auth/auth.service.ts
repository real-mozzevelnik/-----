/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';

export interface User {
  login: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  private users: User[];
  constructor() {
    this.users = [];
    const fs = require('fs');
    const fileContents = fs.readFileSync('data.txt', 'utf8');
    const str = fileContents.split('\n');
    for (let i = 0; i < str.length - 1; i++) {
      const user = str[i].split(' ');
      const loginUser = user[0];
      const passwordUser = user[1];
      const roleUser = user[2];
      this.users.push({
        login: loginUser,
        password: passwordUser,
        role: roleUser,
      });
    }
  }

  addUser(login: string, password: string, role: string): User[] {
    this.users.push({ login, password, role });
    const file = createWriteStream('data.txt', { flags: 'a' });
    file.write(login + ' ' + password + ' ' + role + '\n');
    return this.users;
  }

  varifyUser(login: string, password: string): User {
    const user = this.users.find(
      (user) => user.login === login && user.password === password,
    );
    if (!user) {
      return null;
    }
    return user;
  }

  deleteUser(DeleteLogin: string) {
    const file1 = createWriteStream('data.txt');
    file1.write('');

    this.users.splice(
      this.users.findIndex(({ login }) => login === DeleteLogin),
      1,
    );
    const file = createWriteStream('data.txt', { flags: 'a+' });
    for (const i in this.users)
      file.write(
        this.users[i].login +
          ' ' +
          this.users[i].password +
          ' ' +
          this.users[i].role +
          '\n',
      );
  }

  getAllUsers() {
    return this.users;
  }
}
