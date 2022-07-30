import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from '../dtos/SignUpDto';
import { AuthService } from '../services/auth.service';
import { RefreshTokenDto } from '../dtos/RefreshTokenDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body() user: SignUpDto,
  ): Promise<{ token: string; refresh_token: string }> {
    return await this.authService.signup(user);
  }

  @Post('login')
  async signin(
    @Body() user: SignUpDto,
  ): Promise<{ token: string; refresh_token: string }> {
    return await this.authService.signin(user);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto?.refresh_token) {
      throw new UnauthorizedException('Refresh token is required');
    }
    return await this.authService.refreshToken(refreshTokenDto);
  }
}
