import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { log } from 'console';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Public()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() req:any) {
    return this.authService.signIn(req); // This will return the user object from the request
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  
  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto){
    return this.authService.register(registerDto)
  }

}

