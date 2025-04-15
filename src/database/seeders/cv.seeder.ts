import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cv } from '../../cvs/entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  randEmail,
  randFullName,
  randNumber,
  randJobTitle,
  randFilePath,
} from '@ngneat/falso';
import { Skill } from '../../skills/entities/skill.entity';


@Injectable()
export class CvSeeder {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>
  ) {}
  generateRandomCv() {
    return {
      name: randFullName(),
      firstname: randFullName(),
      age: randNumber({ min: 18, max: 60 }),
      cin: randNumber({ min: 10000000, max: 99999999 }).toString(),
      job: randJobTitle(),
      path: randFilePath(),
      skills: [] as any[],
    } ;
  }

  async clean() {
    await this.cvRepository.delete({});
  }
}