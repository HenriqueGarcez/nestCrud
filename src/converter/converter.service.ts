import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { addMonths, eachMonthOfInterval, getDate, set } from 'date-fns';
import { js2xml, xml2js } from 'xml-js';

@Injectable()
export class ConverterService {
  public convertToSting(data: any): string {
    try {
      return data.toString();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  public convertXmlToJson(data: string) {
    return xml2js(data, { compact: true });
  }
  public convertJsonToXml(data: JSON): string {
    return js2xml(data, { compact: true, spaces: 4 });
  }
  public convertToDate(data: string) {
    console.log(data);
    const createdDate = new Date(data);
    const paymentDay = getDate(createdDate);
    console.log(paymentDay);
    const endDate = addMonths(createdDate, 10);
    const recurrenceDates = eachMonthOfInterval({
      start: createdDate,
      end: endDate
    }).map(date => set(date, { date: paymentDay }));
    return recurrenceDates;
  }
  //   const endDate = addMonths(createdDate, signature.plan.recurrence.months);
  //   const recurrenceDates = eachMonthOfInterval({
  //     start: createdDate,
  //     end: endDate,
  //   });
  // }
}
