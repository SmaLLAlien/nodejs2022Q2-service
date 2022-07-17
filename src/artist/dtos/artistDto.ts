import { IsBoolean, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
