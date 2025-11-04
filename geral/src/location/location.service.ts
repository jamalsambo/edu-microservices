import { Injectable } from '@nestjs/common';
import { CountriesEntity } from './entities/countries.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(CountriesEntity)
    private readonly countriesRepo: Repository<CountriesEntity>,
  ) {}

  async findCountries() {
    return await this.countriesRepo.find({
      relations: ['provinces', 'provinces.districts']
    });
  }
}
