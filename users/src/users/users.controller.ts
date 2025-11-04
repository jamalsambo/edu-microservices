import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  ParseUUIDPipe,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user_created')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('menu')
  async getMenu(@Body() user: any) {
    return this.usersService.getMenu(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get(':username')
  async findByField(@Param('username') username: string) {
    const response = await this.usersService.findOneOrFail({ username });
    return response;
  }

  @Post(':id/permission/:permissionItemId')
  async addPermissions(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Param('permissionItemId', new ParseUUIDPipe()) permissionItemId: string,
  ) {
    return await this.usersService.addPermissions(userId, permissionItemId);
  }

  @Delete(':id/permission/:permissionItemId')
  async removePermissions(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Param('permissionItemId', new ParseUUIDPipe()) permissionItemId: string,
  ) {
    await this.usersService.removePermissions(userId, permissionItemId);
  }
}
