import { IsString } from 'class-validator';

export class GetUserByFirebaseIdDto {
  @IsString()
  firebaseID: string;
}
