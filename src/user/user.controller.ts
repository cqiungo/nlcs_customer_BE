import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@/common/guard/roles.guard';
import { Roles } from '@/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard) // bảo vệ bằng JWT + Roles
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @Roles('ADMIN') // Chỉ ADMIN mới có quyền truy cập
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
