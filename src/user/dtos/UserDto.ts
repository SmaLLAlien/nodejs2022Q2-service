import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}
