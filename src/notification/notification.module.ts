import { Module } from '@nestjs/common';
import { NotificationService } from '~/notification/services/notification.service';
import { SendNotificationController } from '~/notification/controller/notification.controller';
import { UserModule } from '~/user/user.module';

@Module({
  imports: [UserModule],
  providers: [NotificationService],
  controllers: [SendNotificationController],
  exports: [],
})
export class NotificationModule {}
