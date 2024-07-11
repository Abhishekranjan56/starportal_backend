import { User, IUser } from '../models/User';
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')

export class UserService {
  async register(username: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    return user.save();
  }

  async login(email: string, password: string): Promise<{ user: IUser, token: string }> {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { user, token };
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

}
