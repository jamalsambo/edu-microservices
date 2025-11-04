import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import axios from 'axios';

@Controller('api/class')
export class ClassController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  @Post()
  async create(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/class`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':courseId')
  async findAll(@Param('courseId') courseId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/class/${courseId}`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
    @Query('relations') relations?: string,
  ) {
    try {
      const relationArray = relations ? relations.split(',') : [];
      const queryString = relationArray.length
        ? `relations=${relationArray.join(',')}`
        : '';
      const resp = await axios.get(
        `${this.institutionServiceUrl}/class/${field}/${value}${queryString ? '?' + queryString : ''}`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const data = error.response?.data || {
      message: error.message || 'Erro inesperado',
    };
    throw new HttpException(data, status);
  }
}
