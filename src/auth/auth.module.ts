import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CryptService } from './services/crypt.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [forwardRef(() => UserModule), JwtModule, LoggerModule],
  controllers: [AuthController],
  providers: [AuthService, CurrentUserInterceptor, CryptService],
  exports: [CurrentUserInterceptor, AuthService, CryptService],
})
export class AuthModule {}
