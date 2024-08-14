import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.user.dto';
import { LoginUserDto } from './dto/auth.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  signIn(@Body() loginUserDto : LoginUserDto) {
    return this.authService.logIn(loginUserDto.email, loginUserDto.password);
  }

  // @HttpCode(HttpStatus.CREATED)
  // @Post('register')
  // register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(createUserDto);
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Request() req) {
    // Implement logic to handle logout if needed
    return { message: 'Logged out successfully' };
  }

  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('refresh')
  // refresh(@Request() req) {
  //   const user = req.user;
  //   return this.authService.refreshToken(user);
  // }
}
