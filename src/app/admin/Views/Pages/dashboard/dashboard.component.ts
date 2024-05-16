import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {CAROUSEL_OPTION} from "../../../../../helpers/constants";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {TranslationService} from "../../../../../core/_base/layout/service/translation.service";
import {locale as enLang} from "../../../../../core/_config/i18n/en";
import {locale as vnLang} from "../../../../../core/_config/i18n/vn";
import {LineStyle} from "@progress/kendo-angular-charts";
import {ChartConfiguration} from "chart.js";
import {ChartType} from "chart.js/auto";
import {ColDef} from "ag-grid-community";
import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";
import {DoashBoardService} from "./doash-board.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private dialog: MatDialog,private toast: ToastrService,
              private translationService: TranslationService,
              private doashBoardService: DoashBoardService,
              private cdr:ChangeDetectorRef
  ){
    this.translationService.loadTranslations(enLang, vnLang);
  }
  year=2024;
  lstYear=[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
  ngOnInit(): void {
    console.log('da vaoooooooooooo-----------',this.barChartData1)
    this.changeYear();
    // console.log()


    sessionStorage.setItem('routingStack', JSON.stringify([]));
  }

  public barChartLegend1 = true;
  public barChartPlugins1 = [];

  data1:any[]=[]
  data2a:any[]=[]

  @ViewChild("BaseChartDirective") chart: BaseChartDirective | undefined;
  public barChartData1: ChartConfiguration<'bar'>['data'] = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      { data: this.data1, label: 'Doanh thu' },
      { data: this.data2a, label: 'Chi tiêu' },
    ],
  };

  public barChartOptions1: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    aspectRatio: 3,
  };

  changeYear() {
    this.doashBoardService.getDataForDiagram(this.year).subscribe((res:any)=>{
      if(res.status==='OK'){
        this.barChartData1 = {
          ...this.barChartData1,
          datasets: [
            { ...this.barChartData1.datasets[0], data: Array.from(res.data?.dataTurnover) },
            { ...this.barChartData1.datasets[1], data: Array.from(res.data?.dataspend) }
          ]
        };
        this.cdr.detectChanges();
      }else{
        this.toast.error(res.message)
      }
    })
  }
}
