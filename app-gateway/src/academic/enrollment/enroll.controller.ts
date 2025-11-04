import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import axios from 'axios';

@Controller('api/enrollment')
export class EnrollmentController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  @Post()
  async create(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/enrollment`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Req() req: any) {
    try {
      const resp = await axios.patch(
        `${this.institutionServiceUrl}/enrollment/${id}`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post('count')
  async countEnrollment(
    @Body() filters: { classId?: string; status?: string; year?: string },
  ) {
    const { classId, status, year } = filters;
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/enrollment/count`,
        {}, // corpo do POST (vazio nesse caso)
        {
          params: {
            classId,
            status,
            year,
          },
        },
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':institutionId')
  async findAll(
    @Param('institutionId') institutionId: string,
    @Query('relations') relations?: string,
  ) {
    try {
      const relationArray = relations ? relations.split(',') : [];
      const queryString = relationArray.length
        ? `relations=${relationArray.join(',')}`
        : '';

      const resp = await axios.get(
        `${this.institutionServiceUrl}/enrollment/${institutionId}${queryString ? '?' + queryString : ''}`,
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
        `${this.institutionServiceUrl}/enrollment/${field}/${value}${queryString ? '?' + queryString : ''}`,
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
