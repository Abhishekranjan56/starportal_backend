import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa';
import { UserService } from '../services/UserService';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Route('users')
export class UserController extends Controller {
  private userService = new UserService();

  @SuccessResponse('201', 'Created')
  @Post('register')
  public async register(@Body() body: RegisterRequest): Promise<void> {
    await this.userService.register(body.username, body.email, body.password);
    this.setStatus(201);
  }

  @Post('login')
  public async login(@Body() body: LoginRequest): Promise<{ token: string }> {
    const { token } = await this.userService.login(body.email, body.password);
    return { token };
  }

}
