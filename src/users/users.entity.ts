import { Logger } from '@nestjs/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  AfterInsert,
  AfterLoad,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Photo } from '../photos/photos.entity';

export enum USER_STATUS {
  CREATED = 'Criado',
  LOGGED_IN = 'Logado',
  LOGGED_OUT = 'Deslogado'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ default: USER_STATUS.CREATED })
  status: USER_STATUS;

  @OneToMany(
    () => Photo,
    photo => photo.user,
    { cascade: true, eager: true }
  )
  photos: Photo[];

  @AfterLoad()
  userLoaded() {
    Logger.log('Users loaded');
  }

  @BeforeUpdate()
  updateStatus() {
    Logger.log(this);
    Logger.log('User updated');
  }

  @AfterInsert()
  userCreated() {
    Logger.log('User created');
  }
}
