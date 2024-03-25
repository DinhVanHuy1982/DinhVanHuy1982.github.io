import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { LineStyle, SeriesHoverEvent } from '@progress/kendo-angular-charts';
import { ColDef } from 'ag-grid-community';
import { ChartConfiguration } from 'chart.js';
import { ChartType } from 'chart.js/auto';
import { ToastrService } from 'ngx-toastr';

import {locale as vnLang} from '../core/_config/i18n/vn';
import {locale as enLang} from '../core/_config/i18n/en';
import { TranslationService } from 'src/core/_base/layout/service/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  constructor(private dialog: MatDialog,private toast: ToastrService,
    private translationService: TranslationService,
   ){
    this.translationService.loadTranslations(enLang, vnLang);
  }
  ngOnInit(): void {
    console.log('da vaoooooooooooo-----------')

    sessionStorage.setItem('routingStack', JSON.stringify([]));
  }
  style: LineStyle = 'smooth';
  public data = [
    20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19, 1, 20, 2, 18, 5,
    12, 7, 10, 40,
  ];
  public data2 = [
    5, 10, 8, 15, 20, 18, 12, 10, 8, 15, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19,
    1, 20, 2, 18, 5,
  ];
  public seriesNames = ['Series A', 'Series B'];
  chartTooltipContent: string = '';
    title: string = '123';
  onSeriesHover(event: any) {
    // Lấy tên của chuỗi dữ liệu được trỏ vào
    const seriesName = event.category;
    // Lấy giá trị của điểm dữ liệu được trỏ vào
    const value = event.value;
    // Gán giá trị cho tooltip
    this.chartTooltipContent = `${seriesName} - ${value}`;
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public barChartLegend1 = true;
  public barChartPlugins1 = [];

  public barChartData1: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };
  public barChartType: ChartType = 'bar';
  typeChar = 'bar';

  public barChartOptions1: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };


  selectedCar: any;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    columnDefs: ColDef[] = [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' }
    ];
  
    rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 }
    ];
    positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    openToast(){
      this.toast.success("Thành công")
    }
    
}