import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectSchedule, Schedule } from 'nest-schedule';
import { InvoicesService } from '../invoices/invoices.service';

@Injectable()
export class InvoiceSchedulers implements OnModuleInit {
  constructor(
    @InjectSchedule() private readonly schedule: Schedule,
    private readonly invoiceService: InvoicesService
  ) {}
  onModuleInit() {
    this.schedule.scheduleCronJob(
      'update-tracking',
      '*/1 * * * *',
      async () => this.invoiceService.scheduleJob(),
      { waiting: true }
    );
  }
}
