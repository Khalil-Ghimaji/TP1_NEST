import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GetCvsQueryParamsDto } from './dto/get-cvs-query-params.dto';
import { Like, Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  create(createCvDto: CreateCvDto) {
    return 'This action adds a new cv';
  }

  findAll(query:GetCvsQueryParamsDto) {
    let chaine = query.chaine;
    let age = query.age;
    return this.cvRepository.find(
      {
        name:Like(`%${chaine}%`),
        firstName:Like(`%${chaine}%`),
        job:Like(`%${chaine}%`),
        age:age
      } as any);
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
