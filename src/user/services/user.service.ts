import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/services/prisma.service';
import { AddUserDto } from '~/user/dto/add-user.dto';
import { GetUserByFirebaseIdDto } from '~/user/dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async userUpsert(params: AddUserDto) {
    return await this.prismaService.userInfo.upsert({
      where: {
        userId: params.userFirebaseID,
      },
      create: {
        userId: params.userFirebaseID,
        userFCM: params.userFCMToken,
      },
      update: {
        userId: params.userFirebaseID,
        userFCM: params.userFCMToken,
      },
    });
  }

  async getUserByFirebaseID(params: GetUserByFirebaseIdDto) {
    return this.prismaService.userInfo.findUniqueOrThrow({
      where: {
        userId: params.firebaseID,
      },
    });
  }
}
