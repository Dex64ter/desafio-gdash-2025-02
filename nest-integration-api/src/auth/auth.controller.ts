import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

type SignInDto = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      access_token: this.authService.signIn(
        signInDto.email,
        signInDto.password,
      ),
    };
  }

  // @UseGuards(AuthGuard('jwt')) // para proteger uma rota caso não tenha um token válido
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
