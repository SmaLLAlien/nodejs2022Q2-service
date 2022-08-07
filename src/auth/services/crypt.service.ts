import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptService {
  private readonly saltRound: number;

  constructor(private configService: ConfigService) {
    const CRYPT_SALT = +this.configService.get<string>('CRYPT_SALT');
    this.saltRound = isNaN(CRYPT_SALT) ? 10 : CRYPT_SALT;
  }

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRound);
    return bcrypt.hashSync(password, salt);
  }

  comparePasswords(loginPassword: string, dbPassword: string): boolean {
    return bcrypt.compareSync(loginPassword, dbPassword);
  }
}
