/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class GenerateClassCodeService {
  async generateClassCode(
    institutionType: string,
    nextNumber: number,
    area?: string,
  ): Promise<string> {
    const type = institutionType.toLowerCase();

    let prefix = '';

    switch (type) {
      case 'ensino geral':
        prefix = area; // pode ser "TURMA" ou "GRD"
        break;
      case 'jardim de infancia':
        prefix = 'INF';
        break;
      default:
        prefix = 'CRS';
        break;
    }

    // Monta o código final
    const formattedNumber = String(nextNumber).padStart(2, '0'); // ex: 01, 02, 03
    return `${prefix}-${formattedNumber}`;
  }
}
