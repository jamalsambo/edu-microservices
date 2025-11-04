import {
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

@Controller('api/institutions')
export class CurriculumController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  @Post('curriculum')
  async createCurriculum(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/curriculum`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response?.data || { message: 'Erro inesperado' };
    }
  }

  @Get(':institutionId/curriculums')
  async findCurriculums(@Param('institutionId') institutionId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/curriculum/${institutionId}`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get('curriculum/:field/:value')
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
        `${this.institutionServiceUrl}/curriculum/${field}/${value}${queryString ? '?' + queryString : ''}`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post('curriculum/add-discipline')
  async addDiscipline(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/curriculum/add-discipline`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put('curriculum/edit-discipline/:id')
  async editDiscipline(@Param('id') id: string, @Req() req: any) {
    try {
      const resp = await axios.patch(
        `${this.institutionServiceUrl}/curriculum/edit-discipline/${id}`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post('curriculum/add-evolution-type-to-discipline')
  async addEvolutionTypeToDiscipline(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/curriculum/add-evolution-type-to-discipline`,
        req.body,
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
