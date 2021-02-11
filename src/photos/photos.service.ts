import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Photo } from './photos.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
    private usersService: UsersService
  ) {}

  async listAll() {
    return this.photosRepository.find();
  }

  async create(photo: Photo) {
    if (photo.user) {
      const user = await this.usersService.findOne(photo.user);
      photo.user = user;
    }
    return this.photosRepository.save(this.photosRepository.create(photo));
  }
}
