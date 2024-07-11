const amqp = require('amqplib');

export class MessageQueueService {
  private channel: amqp.Channel;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const connection = await amqp.connect(process.env.RABBITMQ_URI!);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('notificationQueue', { durable: true });
  }

  public async publish(message: string) {
    this.channel.sendToQueue('notificationQueue', Buffer.from(message), { persistent: true });
  }

  public async consume() {
    this.channel.consume('notificationQueue', async (msg:any) => {
      if (msg) {
        console.log(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}
