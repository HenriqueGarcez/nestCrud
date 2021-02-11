import { Logger } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeUpdate } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  size: string;

  @ManyToOne(
    () => User,
    user => user.photos,
    { nullable: false }
  )
  user: User;

  @BeforeUpdate()
  updateStatus() {
    Logger.log('Photo update');
  }
}
