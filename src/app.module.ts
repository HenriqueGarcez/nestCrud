import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConverterModule } from './converter/converter.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SchedulersModule } from './schedulers/schedulers.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConverterModule,
    InvoicesModule,
    SchedulersModule,
    UsersModule,
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
