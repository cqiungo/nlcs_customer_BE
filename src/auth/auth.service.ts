import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { comparePassword } from '@/helpers/ultil';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService:JwtService, private config:ConfigService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    const isValidPassword = await comparePassword(password, user!.password);
    if(!user || !isValidPassword){
      return null;
    }
    return user;
  }

async signIn(user: any): Promise<{ user: { id: string; email: string; name: string; phone?: string; role?: string }; access_token: string }> {
  const foundUser = await this.userService.findByEmail(user.email);
  const isValidPassword = await comparePassword(user.password, foundUser!.password);
  if (!isValidPassword) {
    throw new UnauthorizedException("Username/password không đúng");
  }
  const userObj = foundUser!;   
  const { password, ...safeUser } = userObj;
  const payload = { sub: safeUser.id.toString(), username: safeUser.email, phone: safeUser.phone,role: safeUser.role };
  const access_token = await this.jwtService.signAsync(payload);
  return {
  user: {
    id: payload.sub,
    email: safeUser.email,
    name: safeUser.name ?? safeUser.email,
    phone: safeUser.phone ?? "",
    role: safeUser.role,
  },
  access_token,
  };
}

  async register(registerDto: CreateAuthDto){
    return this.userService.handleRegister(registerDto)
  }
}

