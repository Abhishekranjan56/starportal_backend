import { UserService } from '../services/UserService';
import { NotificationService } from '../services/NotificationService';

const userService = new UserService();
const notificationService = new NotificationService();

export const root = {
  getUser: ({ id }: { id: string }) => userService.findById(id),
  getNotifications: ({ userId, page, limit }: { userId: string, page: number, limit: number }) => notificationService.findByUserId(userId, page, limit),
  createUser: ({ username, email, password }: { username: string, email: string, password: string }) => userService.register(username, email, password),
  createNotification: ({ userId, message }: { userId: string, message: string }) => notificationService.create(userId, message),
  markNotificationAsRead: ({ id }: { id: string }) => notificationService.markAsRead(id)
};
