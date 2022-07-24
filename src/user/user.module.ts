import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllerrs/user.controller';
import { UserRepository } from './repository/user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
