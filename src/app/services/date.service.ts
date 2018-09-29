import { Injectable } from '@angular/core';

export const DISPLAY_DATE_FORMAT = 'y-MM-dd';

@Injectable()
export class DateService {

  constructor() { }

  parseDateFromHTMLValue(value: string): Date {
    const dateParts = value.split('-');

    return new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
  }
}
