import { BadRequestException, Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}
  @Get()
  async listAllPhotos() {
    return await this.photosService.listAll();
  }
  @Post()
  async createPhoto(@Body() data) {
    try {
      return await this.photosService.create(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
