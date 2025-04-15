import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cin: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  job: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  path: string;

  @ManyToMany(
    () => Skill,
    (skill) => skill.cvs,
    {cascade: ['insert', 'update'],onDelete: 'CASCADE'}
  )
  @JoinTable()
  skills: Skill[]

  @ManyToOne(() => User,
    (user) => user.cvs,
    {cascade: ['insert', 'update'],onDelete: 'CASCADE'})
  @JoinColumn()
  user: User
}
