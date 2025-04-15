import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { UserSeeder } from './seeders/user.seeder';
import { User } from '../users/entities/user.entity';
import { CvSeeder } from './seeders/cv.seeder';
import { SkillSeeder } from './seeders/skill.seeder';
import { Cv } from '../cvs/entities/cv.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_DATABASE || 'database.sqlite',
      entities: [User, Cv, Skill],
      synchronize: true, // À utiliser avec précaution en production
    }),
    TypeOrmModule.forFeature([User, Cv,Skill])
  ],
  providers: [SeederService, UserSeeder, CvSeeder,SkillSeeder],
})
export class SeederModule {}