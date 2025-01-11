import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MessageDto } from '~/notification/dto/message.dto';
import { UserService } from '~/user/services/user.service';
@Injectable()
export class NotificationService {
  constructor(private readonly userService: UserService) {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FB_PROJECT_ID,
          clientEmail: process.env.FB_CLIENT_EMAIL,
          privateKey: process.env.FB_PRIVATE_KEY,
        }),
        // Optionally specify a databaseURL
        // databaseURL: "https://<YOUR-PROJECT-ID>.firebaseio.com"
      });
    }
  }
  async _sendNotification(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<admin.messaging.MessagingPayload> {
    const message: admin.messaging.Message = {
      token,
      notification: {
        title,
        body,
      },
      data: data || {},
    };

    try {
      await admin.messaging().send(message);
      return {
        notification: {
          title,
          body,
        },
        data,
      };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
  async sendNotification(params: MessageDto) {
    console.log('params', params);
    const receiver = await this.userService.getUserByFirebaseID({
      firebaseID: params.receiver,
    });
    console.log('receiver', receiver);
    if (receiver) {
      return this._sendNotification(
        receiver.userFCM,
        `${params.sender} Gữi tin nhắn`,
        params.content,
      );
    }
  }
}
