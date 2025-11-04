import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import axios from 'axios';

@Controller('api/evolution')
export class EvolutionController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  @Post()
  async create(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/evolution`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post('type')
  async createType(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/evolution/type`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get('type/:institutionId')
  async findType(@Param('institutionId') institutionId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/evolution/type/${institutionId}`,
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
        `${this.institutionServiceUrl}/evolution/${id}`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':institutionId')
  async findAll(
    @Param('institutionId') institutionId: string,
    @Query('studentRelations') studentRelations?: string,
    @Query('evolutionsRelations') evolutionsRelations?: string,
    @Query('classId') classId?: string,
  ) {
    try {
      const params = new URLSearchParams();

      if (studentRelations) params.append('studentRelations', studentRelations);
      if (evolutionsRelations)
        params.append('evolutionsRelations', evolutionsRelations);
      if (classId) params.append('classId', classId); // ✅ enviado apenas se existir

      const url = `${this.institutionServiceUrl}/evolution/${institutionId}${params.toString() ? '?' + params.toString() : ''}`;

      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  //   @Get(':field/:value')
  //   async findByField(
  //     @Param('field') field: string,
  //     @Param('value') value: string,
  //     @Query('relations') relations?: string,
  //   ) {
  //     try {
  //       const relationArray = relations ? relations.split(',') : [];
  //       const queryString = relationArray.length
  //         ? `relations=${relationArray.join(',')}`
  //         : '';
  //       const resp = await axios.get(
  //         `${this.institutionServiceUrl}/enrollment/${field}/${value}${queryString ? '?' + queryString : ''}`,
  //       );
  //       return resp.data;
  //     } catch (error) {
  //       this.handleError(error);
  //     }
  //   }

  private handleError(error: any) {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const data = error.response?.data || {
      message: error.message || 'Erro inesperado',
    };
    throw new HttpException(data, status);
  }
}
