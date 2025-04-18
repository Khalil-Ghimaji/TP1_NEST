import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createCvDto: CreateCvDto) {
    const user = await this.userRepository.findOne({where: { id: createCvDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let cv= {user:user, ...createCvDto};
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

  async findOne(id: number) {
    return await this.cvRepository.findOne({where: { id } });
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    let cv = await this.cvRepository.findOne({where: { id } });
    const user = await this.userRepository.findOne({where: { id: updateCvDto.userId } });
    if(!user) {
      throw new NotFoundException('User not found');
    }
    const {userId, ...rest} = updateCvDto;
    cv ={...cv, ...rest} as Cv;
    return await this.cvRepository.save(cv);
  }

  remove(id: number) {
    return this.cvRepository.delete(id);
  }
}
