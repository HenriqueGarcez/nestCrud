import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) {}
  @Get()
  async listAllInvoices() {
    return await this.invoiceService.listAllInvoices();
  }
  @Post()
  async createInvoice(@Request() req) {
    try {
      return await this.invoiceService.generateInvoice();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
