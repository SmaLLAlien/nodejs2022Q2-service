import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenDto } from '../dtos/TokenDto';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    const headers = req.headers;
    const authorization = (headers as any).authorization;
    const token = authorization && authorization.replace('Bearer ', '');

    if (token) {
      const payload: TokenDto = this.authService.getDataFromAccessToken(token);

      const user =
        payload?.login && (await this.userService.find(payload.login));

      if (user) {
        (req as any).currentUser = user;
      }
    }

    next();
  }
}
