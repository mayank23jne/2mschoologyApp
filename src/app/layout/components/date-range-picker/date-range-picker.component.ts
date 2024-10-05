import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core'; // Capitalized Output
declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements AfterViewInit {
  startDate: string | null = null;
  endDate: string | null = null;

  // Output to emit the selected date range
  @Output() pickedDate: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit() {
    const start = moment().startOf('month'); // Start of current month
  const end = moment().endOf('month'); // End of current month
    function cb(start: any, end: any) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    // Initialize daterangepicker
    $('#reportrange').daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
          'This Year': [moment().startOf('year'), moment().endOf('year')], 
          'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
        },
      },
      cb
    );

    // Display default date range
    cb(start, end);

    // Handle apply event to emit the date range
    $('#reportrange').on('apply.daterangepicker', (ev: any, picker: any) => {
      this.startDate = picker.startDate.format('YYYY-MM-DD'); // Store start date
      this.endDate = picker.endDate.format('YYYY-MM-DD'); // Store end date
      this.pickedDate.emit({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    });
  }
}
