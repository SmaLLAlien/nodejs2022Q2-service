import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, CurrentUserInterceptor],
  exports: [CurrentUserInterceptor, AuthService],
})
export class AuthModule {}
