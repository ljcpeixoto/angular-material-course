import {Directive, OnDestroy, OnInit} from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {tap} from 'rxjs/operators';
import * as moment from "moment";
import {Subscription} from "rxjs";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MONTH_DATE_FORMATS, MonthDateAdapter } from './month-date-adapter';
import { Platform } from '@angular/cdk/platform';

@Directive(
  {
    selector: 'mat-datepicker[monthPicker]',
    providers:[
      {
        provide: DateAdapter,
        useClass: MonthDateAdapter,
        deps: [MAT_DATE_LOCALE, Platform]
      },
      {
        provide: MAT_DATE_FORMATS,
        useValue: MONTH_DATE_FORMATS
      }
    ],
  }
)
export class MonthPickerDirective implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(private datepicker: MatDatepicker<any>) {
  }
  ngOnInit(): void {
    if (this.datepicker) {
      this.datepicker.startView = 'year';
      this.sub = this.datepicker.monthSelected.pipe(tap(data => {
        console.log('Data', data);
        const dataFimMes = moment(data).endOf('month').startOf('day').toDate();
        this.datepicker.select(dataFimMes);
        this.datepicker.close();
      })).subscribe();
      console.log('monthPicker OnInit');
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
