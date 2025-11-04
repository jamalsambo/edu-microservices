import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenStrategy: RefreshTokenStrategy,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('resfresh-token')
  async refreshToken(@Req() req: any) {
    const authString = req.body;
    const jwtKey = Object.keys(authString)[0];

    const validToken =
      await this.refreshTokenStrategy.validateRefreshToken(jwtKey);

    if (!validToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    const newAccessToken = await this.refreshTokenStrategy.generateRefreshToken(
      validToken.sub,
    );
    // const permissions = await this.userService.findPermissions(validToken.sub);

    return {
      token: newAccessToken,
      user: validToken,
      // permissions,
    };
  }

  @Get('validate')
  validate(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.authService.validateToken(token);
  }
}
