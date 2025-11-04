/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class GenerateSortCodeService {
  async generatedSortCode(): Promise<string> {
    // Obtém a data atual no formato yyyyMMddHHmmss
    const dateString = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14);

    // Gera um hash SHA-256 da string da data
    const hash = CryptoJS.SHA256(dateString).toString(CryptoJS.enc.Hex);

    // Extrai apenas os números do hash (remoção de letras)
    const numericHash = hash.replace(/[a-f]/g, '');

    // Seleciona os primeiros 4 dígitos
    const sortCode = numericHash.slice(0, 4);

    // Garante que o sortCode seja preenchido até 4 dígitos (caso o número seja curto)
    return sortCode.padStart(4, '0');
  }
}
