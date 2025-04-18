import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  NotFoundException, Req,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GetCvsQueryParamsDto } from './dto/get-cvs-query-params.dto';
import { Query } from '@nestjs/common';
import { request } from 'express';


@Controller({path: 'cvs', version: '2'})
export class CvsControllerV2 {
  constructor(private readonly cvsService: CvsService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto,@Req() request) {
    createCvDto.userId = request.userId;
    return this.cvsService.create(createCvDto);
  }

  @Get()
  findAll(@Query() query: GetCvsQueryParamsDto) {
    return this.cvsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto,@Req() request) {
    const cv = await this.cvsService.findOne(+id);
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    if (cv.user?.id !== request.userId) {
      throw new ForbiddenException('You are not allowed to update this CV');
    }
    updateCvDto.userId = request.userId;
    return this.cvsService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() request) {
    const cv = await this.cvsService.findOne(+id);
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    if( cv.user?.id !== request.userId) {
      throw new ForbiddenException('You are not allowed to delete this CV');
    }
    return this.cvsService.remove(+id);
  }
}
