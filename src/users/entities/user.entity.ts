// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Cv } from '../../cvs/entities/cv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  password: string;

  @OneToMany(() => Cv,
    (cv) => cv.user,
    {cascade: ['insert', 'update'],onDelete: 'CASCADE'})
  cvs: Cv[]


  // @CreateDateColumn({
  //   type: 'datetime',
  //   name: 'created_at'
  // })
  // createdAt: Date;
  //
  // @UpdateDateColumn({
  //   type: 'datetime',
  //   name: 'updated_at'
  // })
  // updatedAt: Date;

  // Méthode optionnelle pour la sécurité
  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }
}