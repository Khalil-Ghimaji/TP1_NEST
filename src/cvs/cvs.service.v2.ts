import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GetCvsQueryParamsDto } from './dto/get-cvs-query-params.dto';
import { Like, Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createCvDto: CreateCvDto, userId: number) {
    let cv = new Cv();
    const user = await this.userRepository.findOne({where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    cv= {user:user, ...createCvDto} as any;
    return await this.cvRepository.save(cv);
  }

  async findAll(query:GetCvsQueryParamsDto) {
    let chaine = query.chaine;
    let age = query.age;
    let cvs = await this.cvRepository.find()
    cvs = cvs.filter((cv) => {
      let isValidAge = age == undefined || cv.age == age;
      return isValidAge
        && (cv.name.toLowerCase().includes(chaine?.toLowerCase()??'') ||
          cv.firstname.toLowerCase().includes(chaine?.toLowerCase()??'') ||
          cv.job.toLowerCase().includes(chaine?.toLowerCase()??'')
        )
    })
    return cvs;
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  async update(id: number, updateCvDto: UpdateCvDto,userId: number) {
    let cv = await this.cvRepository.findOne({where: { id } });
    if (!cv) {
      throw new Error('CV not found');
    }
    if (cv.user?.id!== userId) {
      throw new ForbiddenException('You are not allowed to update this CV');
    }

    const user = await this.userRepository.findOne({where: { id: userId } });
    cv ={...cv, ...updateCvDto} as Cv;
    return await this.cvRepository.save(cv);
  }

  remove(id: number,userId: number) {
    if (id!== userId) {
      throw new ForbiddenException('You are not allowed to delete this CV');
    }
    return this.cvRepository.delete(id);

  }
}
