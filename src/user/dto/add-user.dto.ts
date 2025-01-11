import { IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  userFirebaseID: string;

  @IsString()
  userFCMToken: string;
}
