import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from '~/notification/services/notification.service';
import { MessageDto } from '~/notification/dto/message.dto';

@Controller('notification')
export class SendNotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('send')
  sendMessage(@Body() messageDTO: MessageDto) {
    return this.notificationService.sendNotification(messageDTO);
  }
}
