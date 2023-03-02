import { Directive, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { tap } from 'rxjs/operators';

@Directive(
  {
    selector: '[monthPicker]'
  }
)
export class MonthPickerDirective implements OnInit {

  constructor(private host: MatDatepicker<any>) {
  }
  ngOnInit(): void {
    this.host.startView = 'year';
    this.host.monthSelected.pipe(tap(data => {
      console.log('Data', data);
      this.host.select(data);
      this.host.close();
    })).subscribe();
    console.log('monthPicker OnInit');
  }


}
