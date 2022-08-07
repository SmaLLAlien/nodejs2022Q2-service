import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { TokenDto } from '../dtos/TokenDto';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const authorization = headers.authorization;
    const token = authorization && authorization.replace('Bearer ', '');

    if (token) {
      const payload: TokenDto = this.authService.getDataFromAccessToken(token);

      const user = payload?.login && this.userService.find(payload.login);
      if (user) {
        request.currentUser = user;
      }
    }

    return next.handle();
  }
}
