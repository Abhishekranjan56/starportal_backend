import { Body, Controller, Get, Path, Post, Put, Query, Route, Security } from 'tsoa';
import { NotificationService } from '../services/NotificationService';
import { INotification } from '../models/Notification';

interface CreateNotificationRequest {
  userId: string;
  message: string;
}

@Route('notifications')
@Security('jwt')
export class NotificationController extends Controller {
  private notificationService = new NotificationService();

  @Post()
  public async createNotification(@Body() body: CreateNotificationRequest): Promise<INotification> {
    return this.notificationService.create(body.userId, body.message);
  }

  @Get()
  public async getNotifications(@Query() userId: string, @Query() page: number = 1, @Query() limit: number = 10): Promise<INotification[]> {
    return this.notificationService.findByUserId(userId, page, limit);
  }

  @Get('{id}')
  public async getNotification(@Path() id: string): Promise<INotification | null> {
    return this.notificationService.markAsRead(id);
  }

  @Put('{id}/read')
  public async markAsRead(@Path() id: string): Promise<INotification | null> {
    return this.notificationService.markAsRead(id);
  }
}
