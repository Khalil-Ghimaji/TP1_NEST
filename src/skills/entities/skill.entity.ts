import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cvs/entities/cv.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(
    { type: 'varchar', length: 255, unique: true, nullable: false }
  )
  designation: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  @JoinTable()
  cvs: Cv[]
}
