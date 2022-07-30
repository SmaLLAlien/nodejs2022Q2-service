import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  private publicUrls = ['/auth/signup', '/auth/login', '/doc', '/'];
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    return this.checkPermission(request);
  }

  private checkPermission(request: Request) {
    if (this.publicUrls.includes(request.url)) {
      return true;
    } else {
      return !!(request as any).currentUser;
    }
  }
}
