import {
  Controller,
  Post,
  Body,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('api/users')
export class UsersController {
  private readonly userServiceUrl = process.env.USER_SERVICE_URL;

  constructor(
    @Inject('APP_GATEWAY_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async login(@Body() body: any) {
    // Envia o evento para o microserviço de notificações
    this.client.emit('user_created', {
      ...body,
    });

    return { message: 'Login request sent to notification service' };
  }
  @UseGuards(JwtAuthGuard)
  @Post('menu')
  async getMenu(@Req() req) {
    try {
      const resp = await axios.post(
        `${this.userServiceUrl}/users/menu`,
        req.user
      );
      return resp.data;
    } catch (error) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response?.data || {
        message: error.message || 'Erro inesperado',
      };

      // Lança uma exceção do NestJS com o status correto
      throw new HttpException(data, status);
    }
  }

  @Post(':id/permission/:permission/')
  async addPermission(
    @Param('id', new ParseUUIDPipe()) userId: string,
  @Param('permission', new ParseUUIDPipe()) permissionItemId: string,
  ) {
    try {
      // Faz a chamada para o serviço remoto
      const resp = await axios.post(
        `${this.userServiceUrl}/users/${userId}/permission/${permissionItemId}`,
      );
      return resp.data;
    } catch (error) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response?.data || {
        message: error.message || 'Erro inesperado',
      };

      // Lança uma exceção do NestJS com o status correto
      throw new HttpException(data, status);
    }
  }
}
