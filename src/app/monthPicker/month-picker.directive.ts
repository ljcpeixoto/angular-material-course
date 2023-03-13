import { AfterViewInit, ContentChild, Directive, OnDestroy } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MONTH_DATE_FORMATS, MonthDateAdapter } from './month-date-adapter';
import { Platform } from '@angular/cdk/platform';

@Directive(
  {
    selector: '[monthPicker]',
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
export class MonthPickerDirective implements OnDestroy, AfterViewInit {
  private sub: Subscription;
  @ContentChild(MatDatepicker) private datepicker: MatDatepicker<any>;
  constructor() {}

  ngAfterViewInit(): void {

    if (this.datepicker) {
      this.datepicker.startView = 'year';
      this.datepicker.panelClass = 'mat-month-view-hidden';
      this.sub = this.datepicker.monthSelected.pipe(tap(data => {
        this.datepicker.close();
        const dataFimMes = moment(data).endOf('month').startOf('day').toDate();
        this.datepicker.select(dataFimMes);
      })).subscribe();
      console.log('monthPicker configured');
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }



}
