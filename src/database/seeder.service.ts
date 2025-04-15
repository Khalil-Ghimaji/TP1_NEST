import { Injectable } from '@nestjs/common';
import { UserSeeder } from './seeders/user.seeder';
import { CvSeeder } from './seeders/cv.seeder';
import { SkillSeeder } from './seeders/skill.seeder';
import { Skill } from '../skills/entities/skill.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeederService {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly cvSeeder: CvSeeder,
    private readonly skillSeeder: SkillSeeder,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async seed() {
    for(let i=0; i<10; i++){
      let user = this.userSeeder.generateRandomUser();
      let cv = this.cvSeeder.generateRandomCv();
      user.cvs.push(cv);
      const skills = Array.from({ length: 3 }, () => this.skillSeeder.generateRandomSkill()) as Skill[];
      cv.skills = skills;
      await this.userRepository.save(user);


    }
    console.log('Database seeding completed!');
  }

  async clean() {
    await this.skillSeeder.clean();
    await this.cvSeeder.clean();
    await this.userSeeder.clean();
    console.log('Database cleaning completed!');
  }
}