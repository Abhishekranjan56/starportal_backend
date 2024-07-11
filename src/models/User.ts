import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  connected: boolean;
  role: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  connected: { type: Boolean, default: false },
  role: { type: String, default: 'user' }
});

export const User = model<IUser>('User', userSchema);
