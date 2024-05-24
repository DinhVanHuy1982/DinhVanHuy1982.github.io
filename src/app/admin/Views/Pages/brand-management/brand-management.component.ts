import {Component, OnInit} from '@angular/core';
import {BrandService} from "./brand.service";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {
  ActionRoleManagementComponent
} from "../role-management/action-role-management/action-role-management.component";
import {ActionBrandManagementComponent} from "./action-brand-management/action-brand-management.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  CreateUpdateProductComponent
} from "../product-management/create-update-product/create-update-product.component";
import {CreateUpdateBrandComponent} from "./create-update-brand/create-update-brand.component";
import {UserService} from "../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss']
})
export class BrandManagementComponent implements OnInit{
  rowData:any;
  totalElement=0;
  totalPage=0;
  dataSearch={
    status:null,
    searchBrand: ""
  }
  action: any;
  constructor(private brandService: BrandService,
              private dialog: MatDialog,
              private userService:UserService
  ) {
    this.userService.getAction().subscribe((res:any)=>{
      console.log("Action: ",res)
      this.action = res;
    })
  }

  ngOnInit(): void {
    this.search()
  }
  itemStatus=[
    {
      name: "Hoạt động",
      code: 1,
      color: "green"
    },
    {
      name: "Không hoạt động",
      code:0,
      color: "red",
    }
  ];

  columnDef:any = [
    {
      headerName: 'STT',
      valueGetter: (param:any) => {
        return (param.node.rowIndex + 1)
      },
      width: 100,
      pinned: 'left',
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },
    },{
      headerName: 'Mã nhãn hàng',
      field:"brandCode",
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },

    },{
      headerName: 'Tên nhãn hàng',
      field:"brandName",
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },

    },{
      headerName: 'Mã nhãn hàng',
      field:"brandCode",
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },

    },{
      headerName: 'Địa chỉ',
      field:"address",
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },
    },{
      headerName: 'Liên hệ',
      headerClass: 'grid-title center',
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },
      cellRenderer: (param:any) => {
        if(param.data?.phoneNumber && param.data?.email ){
          var temDiv = document.createElement('div');
          var dateDiv = document.createElement('div');
          var timeDiv = document.createElement('div');
          dateDiv.innerText = param.data?.phoneNumber;
          temDiv.innerText = param.data?.email;
          temDiv.style.textAlign='left'
          dateDiv.style.textAlign='left'
          timeDiv.style.textAlign='left'
          temDiv.appendChild(dateDiv);
          temDiv.appendChild(timeDiv);
          return temDiv;
        }else{
          return null
        }
      },
      autoHeight: true,
      suppressSizeToFit: true
    },{
      headerName: 'Trạng thái',
      field: 'status',
      valueGetter: (param:any) => {
        if(param.data?.status == 1){
          return "Đang hoạt động"
        }else{
          return "Không hoạt động"
        }
      },
      cellClass: (param: any) => {
        return param.data?.status === 1 ? 'active-status' : 'inactive-status';
      },
      cellStyle: (param:any) => {
        return {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          display: 'flex',
          top: '0px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
        };
      },
    },{
      headerName: 'Action',
      cellRenderer: ActionBrandManagementComponent,
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
  noRowsTemplate = NO_ROW_GRID_TEMPLATE
  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }
   search(){
     this.brandService.getPageBrand(this.dataSearch).subscribe((data:any)=>
       {

         this.totalElement=data.totalElements
         this.totalPage = data.totalPages
         this.rowData=data.content.map((item:any)=>{
           item.createTime = new Date(item.createTime)
           return item;
         })
       }
     )
   }
  callInforReview(empty:any,event:any){
    // this.dataSearch.
  }
  openCreate(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      maxHeight: '600px',
      minHeight: '400px',
      width:'600px',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: true
      }
    };
    this.dialog.open(CreateUpdateBrandComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {
        this.search()
      }
    )
  }
}
