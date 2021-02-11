import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { InvoicesModule } from '../invoices/invoices.module';
import { InvoiceSchedulers } from './InvoiceSchedulers.service';

@Module({
  imports: [InvoicesModule, ScheduleModule.register()],
  providers: [InvoiceSchedulers]
})
export class SchedulersModule {}
