import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '~/user/services/user.service';
import { AddUserDto } from '~/user/dto/add-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  createOrUpdateUser(@Body() addUserDto: AddUserDto) {
    return this.userService.userUpsert(addUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserByFirebaseID({ firebaseID: id });
  }
}
