import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './database/seeder.service';
import { UserSeeder } from './database/seeders/user.seeder';
import { User } from './users/entities/user.entity';
import { Skill } from './skills/entities/skill.entity';
import { Cv } from './cvs/entities/cv.entity';
import { SkillSeeder } from './database/seeders/skill.seeder';
import { CvSeeder } from './database/seeders/cv.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_DATABASE || 'database.sqlite',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User, Cv, Skill],
      synchronize: true, // À utiliser avec précaution en production
    }),
    TypeOrmModule.forFeature([User, Cv,Skill])
  ],
  providers: [SeederService, UserSeeder, SkillSeeder,CvSeeder ],
})
export class AppModule {}