import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import axios from 'axios';
import { JwtAuthGuard } from './jwt.guard';

@Controller('api/auth')
export class AuthController {
  private authServiceUrl = process.env.AUTH_SERVICE_URL;

  @Post('login')
  async login(@Req() req: any) {
    try {
      // Faz a chamada para o serviço remoto
      const resp = await axios.post(
        `${this.authServiceUrl}/auth/login`,
        req.body,
      );

      // Retorna os dados normalmente (status 200 padrão)
      return resp.data;
    } catch (error: any) {
      // Captura o status do serviço remoto, se existir
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response?.data || {
        message: error.message || 'Erro inesperado',
      };

      // Lança uma exceção do NestJS com o status correto
      throw new HttpException(data, status);
    }
  }

  @Get('resfresh-token')
  async refreshToken(@Req() req: any) {
    const token = req.headers['authorization'];
    const refreshToken = token.split(' ')[1];

    try {
      const resp = await axios.post(
        `${this.authServiceUrl}/auth/resfresh-token`,
        refreshToken,
      );
      return resp.data;
    } catch (error: any) {
      return (
        error.response?.data || { message: error.message || 'Erro inesperado' }
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return { message: 'Usuário autenticado com sucesso!', user: req.user };
  }
}
