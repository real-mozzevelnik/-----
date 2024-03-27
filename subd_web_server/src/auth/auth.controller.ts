import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('addUser')
  addUser(
    @Body('login') login,
    @Body('password') password,
    @Body('role') role,
  ) {
    return this.authServise.addUser(login, password, role);
  }

  @Post('delete')
  deleteUser(@Body('login') login) {
    return this.authServise.deleteUser(login);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    console.log(req.user);
    return req.user;
  }
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  profile(@Request() req) {
    return {
      msg: 'You an authorized user',
      user: req.user,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('users')
  getAllUsers() {
    return this.authServise.getAllUsers();
  }

  @Post('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'Your session is destroyed' };
  }
}
