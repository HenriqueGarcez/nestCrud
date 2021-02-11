import { Body, Get, Param } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async listAllUsers() {
    return await this.usersService.listAll();
  }
  @Post()
  async createUser(@Body() data) {
    try {
      return await this.usersService.create(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id, @Body() data) {
    try {
      return await this.usersService.update(id, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
