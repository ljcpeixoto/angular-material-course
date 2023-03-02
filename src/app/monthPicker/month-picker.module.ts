import {Inject, Injector, NgModule} from "@angular/core";
import {MonthPickerDirective} from "./month-picker.directive";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MONTH_DATE_FORMATS, MonthDateAdapter} from "./month-date-adapter";
import {Platform} from "@angular/cdk/platform";


function MonthDateAdapterFactory(matDateLocale: string, platform: Platform, injector: Injector) {
  console.log('Injector', injector);
  return new MonthDateAdapter(matDateLocale, platform);
}

@NgModule({
  declarations: [
    MonthPickerDirective
  ],
  providers:[
    {
      provide: DateAdapter,
      useFactory: MonthDateAdapterFactory,
      deps: [MAT_DATE_LOCALE, Platform, Injector]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MONTH_DATE_FORMATS
    }
  ],
  // exports: [
  //   MonthPickerDirective
  // ]
})
export class MonthPickerModule {
}
