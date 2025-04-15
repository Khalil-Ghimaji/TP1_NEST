import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randEmail, randFullName, randPassword, randText, randUserName } from '@ngneat/falso';


@Injectable()
export class SkillSeeder {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) {}

  generateRandomSkill() {
    return {
      designation: randText(),
    };
  }

  // async seed() {
  //   const skills = await this.skillRepository.find();
  //   if (skills.length === 0) {
  //     const randomSkills = Array.from({ length: 10 }, generateRandomSkill);
  //     await this.skillRepository.save(randomSkills as Skill[]);
  //   }
  // }

  async clean() {
    await this.skillRepository.delete({});
  }
}