import { OmitType } from '@nestjs/mapped-types';
import { Cv } from '../entities/cv.entity';

export class CreateCvDto extends OmitType(Cv, ['id','user'] as const) {
  userId?: number;
}

