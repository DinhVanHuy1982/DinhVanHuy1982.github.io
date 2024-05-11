import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateRoleComponent} from "../role-management/create-update-role/create-update-role.component";
import {CreateUpdateSaleComponent} from "./create-update-sale/create-update-sale.component";
import {ProductService} from "../product-management/product.service";
import {ActionProductComponent} from "../product-management/action-product/action-product.component";
import {ActionSaleComponent} from "./action-sale/action-sale.component";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {SaleService} from "./sale.service";

@Component({
  selector: 'app-sale-management',
  templateUrl: './sale-management.component.html',
  styleUrls: ['./sale-management.component.scss']
})
export class SaleManagementComponent implements OnInit{
  formSearch={
    pageSize: 10,
    page:1,
    keySearch:"",
    type:"",
    applySearch:null
  }
  rowData:any;
  totalPage=0;
  totalElement=0;
  currentPage=1;
  constructor(private dialog:MatDialog,
              private productService:ProductService,
              private saleService: SaleService) {
  }

  ngOnInit(): void {
    this.search()
  }
  openCreate(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      disableClose: false,
      hasBackdrop: true,
      width: '760px',
      height: '886px',
      data: {
        isCreate: true
      }
    };
    this.dialog.open(CreateUpdateSaleComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {
        this.search()
      }
    )
  }
  search(){
    this.saleService.searchSale(this.formSearch).subscribe((res:any)=>{
      this.rowData=res.data.content.map((item:any)=>{
        item.startTime= new Date(item.startTime*1000)
        item.endTime= new Date(item.endTime*1000)
        return item
      })
      this.totalElement = res.data.totalElements
      this.totalPage=res.data.totalPages
    })
  }
  columdef:any = [
    {
    headerName: 'STT',
    valueGetter: (param:any) => {
      return (param.node.rowIndex + 1)
    },
    width: 100,
    pinned: 'left',
    },{
      headerName: "Mã giảm giá",
      field: "code",
    },{
      headerName: "Tên mã giảm giá",
      field: "name",
    },{
      headerName: "Số lượng",
      field: "quantity",
    },{
      headerName: "Loại giảm giá",
      field: "type",
    },{
      headerName: "Ngày bắt đầu",
      field: "startTime",
    },{
      headerName: "Ngày kết thúc",
      field: "endTime",
    },{
      headerName: 'Action',
      cellRenderer: ActionSaleComponent,
      pinned: 'right',
      cellStyle: {
        'font-weight': '500',
        'font-size': '12px',
        'line-height': '30px',
        color: '#101840',
        display: 'flex',
        'justify-content': 'center',
        overflow: 'unset',
      },
      field: '',
      lockPosition: true,
      width:100,
      cellClass: 'cell-action',
    }
  ]

  noRowsTemplate = NO_ROW_GRID_TEMPLATE;
  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }
  callInforReview(noaction:any,page: any){
    // this.formSearch.page=page;
    this.search();
  }

}
