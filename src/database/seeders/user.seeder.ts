import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randEmail, randFullName, randPassword, randText, randUserName } from '@ngneat/falso';
import { Cv } from '../../cvs/entities/cv.entity';


@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
   generateRandomUser() {
    return {
      username: randUserName(),
      email: randEmail(),
      password: randText(),
      cvs:[] as any[],
    };
  }

  // async seed() {
  //   const users = await this.userRepository.find();
  //   if (users.length === 0) {
  //     const randomUsers = Array.from({ length: 10 }, generateRandomUser);
  //     await this.userRepository.save(randomUsers as User[]);
  //   }
  // }

  async clean() {
    await this.userRepository.delete({});
  }
}