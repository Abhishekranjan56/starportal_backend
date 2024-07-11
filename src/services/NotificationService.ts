import { Notification, INotification } from '../models/Notification';

export class NotificationService {
  async create(userId: string, message: string): Promise<INotification> {
    const notification = new Notification({ userId, message });
    return notification.save();
  }

  async findByUserId(userId: string, page: number, limit: number): Promise<INotification[]> {
    return Notification.find({ userId }).skip((page - 1) * limit).limit(limit);
  }

  async markAsRead(id: string): Promise<INotification | null> {
    return Notification.findByIdAndUpdate(id, { read: true }, { new: true });
  }
}
