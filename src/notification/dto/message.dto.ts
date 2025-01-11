import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  sender: string;

  @IsString()
  receiver: string;

  @IsString()
  content: string;
}
