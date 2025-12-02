import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
