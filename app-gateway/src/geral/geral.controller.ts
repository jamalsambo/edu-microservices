import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Controller('api/geral')
export class GeralController {
  private geralServiceUrl = process.env.GERAL_SERVICE_URL;

  @Get('module-system')
  async find() {
    try {
      const resp = await axios.get(`${this.geralServiceUrl}/module-system`);
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

  @Get('countries')
  async findCountries() {
    try {
      const resp = await axios.get(
        `${this.geralServiceUrl}/location/countries`,
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
