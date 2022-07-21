import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllerrs/user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
