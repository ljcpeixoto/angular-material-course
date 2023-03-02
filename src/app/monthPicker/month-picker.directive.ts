import {Directive, OnDestroy, OnInit} from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {tap} from 'rxjs/operators';
import * as moment from "moment";
import {Subscription} from "rxjs";

@Directive(
  {
    selector: 'mat-datepicker[monthPicker]',
  }
)
export class MonthPickerDirective implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(private datepicker: MatDatepicker<any>) {
  }
  ngOnInit(): void {
    this.datepicker.startView = 'year';
    this.sub = this.datepicker.monthSelected.pipe(tap(data => {
      console.log('Data', data);
      const dataFimMes = moment(data).endOf('month').startOf('day').toDate();
      this.datepicker.select(dataFimMes);
      this.datepicker.close();
    })).subscribe();
    console.log('monthPicker OnInit');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
