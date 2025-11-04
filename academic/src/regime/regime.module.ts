import { Module } from '@nestjs/common';
import { RegimeService } from './regime.service';
import { RegimeController } from './regime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegimeEntity } from './entities/regime.entity';
import { PeriodEntity } from './entities/periods.entity';
import { PeriodRangeEntity } from './entities/period-range.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegimeEntity,PeriodEntity,PeriodRangeEntity])],
  controllers: [RegimeController],
  providers: [RegimeService],
  exports: [RegimeService]
})
export class RegimeModule {}
