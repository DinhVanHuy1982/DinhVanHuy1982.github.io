import {Component, OnInit} from '@angular/core';
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "./order.service";
import {
  ActionBrandManagementComponent
} from "../brand-management/action-brand-management/action-brand-management.component";
import {ActionOrderManagementComponent} from "./action-order-management/action-order-management.component";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit{
  noRowsTemplate = NO_ROW_GRID_TEMPLATE
  rowData: any;
  columnDef:any=[
    {
      headerName: 'STT',
      headerClass:'header-center wrap-Htext title-cell-violation',
      valueGetter: (param:any) => {
        return (param.node.rowIndex + 1)
      },
      width: 100,
      pinned: 'left',
    },{
      headerName: 'Mã đặt hàng',
      field:"code",
    },{
      headerName: 'Người đặt hàng',
      field:"userBuy",
    },{
      headerName: 'Ngày đặt hàng',
      field:"orderDate",
    },{
      headerName: 'Phương thức thanh toán',
      field:"paymentMethod",
      valueGetter: (param:any) => {
        if(param.data?.paymentMethod == 1){
          return "Thanh toán online"
        }else{
          return "Thanh toán khi nhận hàng"
        }
      },
    },{
      headerName: 'Tổng hóa đơn',
      field:"priceOrder",
    },{
      headerName: 'Trạng thái',
      field:"nameStatus",
      cellClass: (param: any) => {
        if(param.data?.status==3){
          return 'active-status';
        }else if(param.data?.status==2){
          return 'warning-status'
        }else if(param.data?.status==1){
          return 'orangre-status'
        }else if(param.data?.status==0){
          return 'waiting-status';
        }else if(param.data?.status==4){
          return 'inactive-status';
        }else{
          return ''
        }
      }
    },{
      headerName: 'Action',
      cellRenderer: ActionOrderManagementComponent,
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
  ];

  itemStatus=[
    {
      name: "Đợi xác nhận",
      code: 0,
      color: "blue"
    },
    {
      name: "Đã xác nhận",
      code:1,
      color: "orange",
    },
    {
      name: "Đang giao hàng",
      code:2,
      color: "blue",
    },
    {
      name: "Đã hoàn thành",
      code:3,
      color: "green",
    },
    {
      name: "Hoàn hủy",
      code:4,
      color: "red",
    }
  ];
  totalElement: any;
  totalPage: any;
  dataSearch={
    status:null,
    keySearch:"",
    page:1,
    pageSize:10
  };
  constructor(private dialog: MatDialog,
              private toast:ToastrService,
              private orderService:OrderService) {
  }
  ngOnInit(): void {
    this.search()
  }

  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }

  search() {
    this.orderService.searchOrder(this.dataSearch).subscribe((res:any)=>{
      this.rowData=res.data.content.map((item:any)=>{
        item.orderDate = new Date(item.orderDate*1000)
        return item
      });
      this.totalElement = res.data.totalElements;
      this.totalPage = res.data.totalPages;
    })
  }
  openCreate(){

  }

  callInforReview(param:any, page: number) {
    this.dataSearch.page=page;
    this.search()
  }

  searchButton() {
    this.dataSearch.page=1;
    this.search()
  }
}
