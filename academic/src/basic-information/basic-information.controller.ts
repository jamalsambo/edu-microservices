import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { BasicInformationService } from './basic-information.service';
import { CreateBasicInformationDto } from './dto/create-basic-information.dto';
import { UpdateBasicInformationDto } from './dto/update-basic-information.dto';

@Controller('basic-information')
export class BasicInformationController {
  constructor(
    private readonly basicInformationService: BasicInformationService,
  ) {}

  @Post()
  create(@Body() createBasicInformationDto: CreateBasicInformationDto) {
    return this.basicInformationService.create(createBasicInformationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basicInformationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBasicInformationDto: UpdateBasicInformationDto,
  ) {
    return this.basicInformationService.update(id, updateBasicInformationDto);
  }
}
