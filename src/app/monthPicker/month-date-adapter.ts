import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import {Platform} from "@angular/cdk/platform";

export const MONTH_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Injectable()
export class MonthDateAdapter extends NativeDateAdapter {

  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
    moment.locale('pt-br');
  }
  format(date: Date, displayFormat: any): string {
    if (displayFormat === 'YYYY-MM') {
      return moment(date).format('YYYY-MM')
    }
    return date.toLocaleDateString();
  }

  parse(value: any, parseFormat?: any): Date | null {
    return moment(value, 'YYYY-MM').toDate();
  }

}


