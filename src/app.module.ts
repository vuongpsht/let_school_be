import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '~/user/user.module';
import { PrismaModule } from '~/prisma/prisma.module';
import { NotificationModule } from '~/notification/notification.module';

@Module({
  imports: [UserModule, NotificationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
