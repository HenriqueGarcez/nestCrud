import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async listAll() {
    return this.usersRepository.find();
  }

  async findOne(id) {
    return this.usersRepository.findOne(id);
  }

  async create(user: User) {
    return this.usersRepository.save(this.usersRepository.create(user));
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.usersRepository.findOne(id);
    return this.usersRepository.save(
      this.usersRepository.create({ ...user, ...data })
    );
  }
}
