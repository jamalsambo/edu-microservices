import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import axios from 'axios';

@Controller('api/employee')
export class EmployeeController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  @Post('create')
  async create(@Req() req: any) {
     console.log('create')
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/employee`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response.data;
    }
  }

  @Get('find')
  async findAll() {
    try {
      const resp = await axios.get(`${this.institutionServiceUrl}/employee`);
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

  @Post('teachings')
  async addTeachings(@Req() req: any) {
    console.log('teachings')
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/employee/teachings`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response.data;
    }
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/employee/${field}/${value}`,
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

  @Patch(':id')
  async update(@Param('id') id: string, @Req() req: any) {
    try {
      const resp = await axios.patch(
        `${this.institutionServiceUrl}/employee/${id}`,
        req.body,
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
