import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../user/dtos/CreateUserDto';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { RefreshTokenDto } from '../dtos/RefreshTokenDto';
import { TokenDto } from '../dtos/TokenDto';

@Injectable()
export class AuthService {
  private readonly saltRound: number;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtTokenService: JwtService,
  ) {
    const CRYPT_SALT = +this.configService.get<string>('CRYPT_SALT');
    this.saltRound = isNaN(CRYPT_SALT) ? 10 : CRYPT_SALT;
  }

  async signup(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refresh_token: string }> {
    const userInDb = await this.userService.find(user.login);

    if (userInDb) {
      throw new BadRequestException('Login in use');
    }

    const hashPassword = await this.hashPassword(user.password);

    const newUser: CreateUserDto = {
      ...user,
      password: hashPassword,
    };

    await this.userService.createUser(newUser);

    const accessToken = this.generateToken(userInDb.id, userInDb.login);
    const refresh_token = this.generateRefreshToken(
      userInDb.id,
      userInDb.login,
    );

    return {
      accessToken,
      refresh_token,
    };
  }

  async signin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refresh_token: string }> {
    const userInDb: User = await this.userService.find(user.login);

    if (!userInDb) {
      throw new ForbiddenException('Not found user');
    }

    const isPasswordsEqual = await this.comparePasswords(
      user.password,
      userInDb.password,
    );

    if (!isPasswordsEqual) {
      throw new ForbiddenException('Password is incorrect');
    }

    const accessToken = this.generateToken(userInDb.id, userInDb.login);
    const refresh_token = this.generateRefreshToken(
      userInDb.id,
      userInDb.login,
    );

    return {
      accessToken,
      refresh_token,
    };
  }

  async refreshToken({
    refresh_token,
  }: RefreshTokenDto): Promise<{ accessToken: string; refresh_token: string }> {
    try {
      const options: JwtVerifyOptions = {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      };
      const payload: TokenDto = this.jwtTokenService.verify(
        refresh_token,
        options,
      );

      if (payload.exp * 1000 < Date.now()) {
        throw new ForbiddenException('Refresh token is expired');
      }

      const accessToken = this.generateToken(payload.userId, payload.login);
      const refreshToken = this.generateRefreshToken(
        payload.userId,
        payload.login,
      );
      return {
        accessToken,
        refresh_token: refreshToken,
      };
    } catch (e) {
      console.log(e.message);
      throw new ForbiddenException('Refresh token is invalid');
    }
  }

  getDataFromAccessToken(token: string): TokenDto {
    try {
      const options: JwtVerifyOptions = {
        secret: this.configService.get('JWT_SECRET_KEY'),
      };
      const payload: TokenDto = this.jwtTokenService.verify(token, options);

      if (payload.exp * 1000 < Date.now()) {
        throw new ForbiddenException('Token is expired');
      }

      return payload;
    } catch (e) {
      console.log(e.message);
      throw new ForbiddenException('Token is invalid');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRound);
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(
    loginPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(loginPassword, dbPassword);
  }

  private generateToken(userId: string, userLogin: string): string {
    const options: JwtSignOptions = {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
    };
    const accessToken: string = this.jwtTokenService.sign(
      { userId, login: userLogin },
      options,
    );

    return accessToken;
  }

  private generateRefreshToken(userId: string, userLogin: string): string {
    const options: JwtSignOptions = {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    };
    const refresh_token = this.jwtTokenService.sign(
      { userId, login: userLogin },
      options,
    );

    return refresh_token;
  }
}
