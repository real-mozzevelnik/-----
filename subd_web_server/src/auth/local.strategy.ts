import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { User } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  validate(login: string, password: string): User | null {
    const user = this.authService.varifyUser(login, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect login or password');
    }
    return user;
  }
}
