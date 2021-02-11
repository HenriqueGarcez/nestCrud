import { Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}
  @Get('todate/:date')
  convertoToDate(@Param() params) {
    return this.converterService.convertToDate(params.date);
  }
  @Post('tostring')
  convertToString(@Request() req): string {
    return this.converterService.convertToSting(req.body.message);
  }
  @Post('xmltojson')
  convertXmlToJson(@Request() req) {
    return this.converterService.convertXmlToJson(req.body.message);
  }
  @Post('jsontoxml')
  convertJsonToXml(@Request() req): string {
    return this.converterService.convertJsonToXml(req.body.message);
  }
}
