import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import axios from 'axios';

@Controller('api/regime')
export class RegimeController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  @Get()
  async find() {
    try {
      const resp = await axios.get(`${this.institutionServiceUrl}/regime`);
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':field/:value')
  async findByField(
    @Param('field') field: string,
    @Param('value') value: string,
  ) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/regime/${field}/${value}`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post('period-range/:periodId/institution/:institutionId')
  async createPeriodRange(
    @Param('periodId') periodId: string,
    @Param('institutionId') institutionId: string,
    @Req() req: any,
  ) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/regime/period-range/${periodId}/institution/${institutionId}`,
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
