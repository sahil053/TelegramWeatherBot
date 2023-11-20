import { IsString, IsBoolean } from 'class-validator';

export class UserObjectDto {
  @IsString()
  UID: string;

  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsBoolean()
  subscribed: boolean;

  @IsBoolean()
  blocked: boolean;
}