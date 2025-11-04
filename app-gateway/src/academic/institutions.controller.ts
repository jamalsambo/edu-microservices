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

@Controller('api/institutions')
export class InstitutionsController {
  private institutionServiceUrl = process.env.ACADEMIC_SERVICE_URL;

  /** -----------------------------
   *  ROTAS ESTÁTICAS (sem params)
   *  ----------------------------- */
  @Post('create')
  async create(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/institution/create`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response?.data || { message: 'Erro inesperado' };
    }
  }

  @Get('find')
  async findAll() {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/institution/find`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post('shift')
  async createShift(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/institution/shift`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response?.data || { message: 'Erro inesperado' };
    }
  }

  @Post('room')
  async createRoom(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/institution/room`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response?.data || { message: 'Erro inesperado' };
    }
  }

   @Post('discipline')
  async createDiscipline(@Req() req: any) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/institution/discipline`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      return error.response?.data || { message: 'Erro inesperado' };
    }
  }

  

  @Patch('update/:id')
  async update(@Param('id') id: string, @Req() req: any) {
    try {
      const resp = await axios.patch(
        `${this.institutionServiceUrl}/institution/${id}`,
        req.body,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /** -----------------------------
   *  ROTAS ANINHADAS (com params)
   *  ----------------------------- */

  @Post(':institutionId/regime/:regimeId')
  async createPeriod(
    @Param('institutionId') institutionId: string,
    @Param('regimeId') regimeId: string,
  ) {
    try {
      const resp = await axios.post(
        `${this.institutionServiceUrl}/institution/${institutionId}/regime/${regimeId}`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':institutionId/regimes')
  async findRegimes(@Param('institutionId') institutionId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/institution/${institutionId}/regimes`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':institutionId/shifts')
  async findShifts(@Param('institutionId') institutionId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/institution/${institutionId}/shifts`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':institutionId/rooms')
  async findRooms(@Param('institutionId') institutionId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/institution/${institutionId}/rooms`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':institutionId/disciplines')
  async findDisciplines(@Param('institutionId') institutionId: string) {
    try {
      const resp = await axios.get(
        `${this.institutionServiceUrl}/institution/${institutionId}/disciplines`,
      );
      return resp.data;
    } catch (error) {
      this.handleError(error);
    }
  }

 

  /** -----------------------------
   *  FUNÇÃO AUXILIAR DE ERRO
   *  ----------------------------- */
  private handleError(error: any) {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const data = error.response?.data || {
      message: error.message || 'Erro inesperado',
    };
    throw new HttpException(data, status);
  }
}
