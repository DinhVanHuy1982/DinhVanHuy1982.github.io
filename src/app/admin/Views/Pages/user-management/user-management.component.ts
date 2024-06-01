import {Component, OnInit} from '@angular/core';
import {
  ActionBrandManagementComponent
} from "../brand-management/action-brand-management/action-brand-management.component";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateBrandComponent} from "../brand-management/create-update-brand/create-update-brand.component";
import {CreateUpdateUserComponent} from "./create-update-user/create-update-user.component";
import {UserService} from "../../../../viewsShare/Views/user.service";
import {ActionUserManagementComponent} from "./action-user-management/action-user-management.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{
  dataSearch={
    status:null,
    keySearch: "",
    page:1,
    pageSize:10
  }
  totalPage: any;

  constructor(private dialog: MatDialog,
              private userService: UserService) {
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
        return (param.node.rowIndex + 1)+ (this.dataSearch.page-1)*10
      },
      width: 100,
      pinned: 'left',
    },{
      headerName: 'Tên đăng nhập',
      field:"userName",

    },{
      headerName: 'Họ và tên',
      field:"fullName",

    },{
      headerName: 'Số điện thoại',
      field:"phoneNumber",

    },{
      headerName: 'Email',
      field:"email",

    },{
      headerName: 'Role',
      field:"roleName"
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
      }
    },{
      headerName: 'Action',
      cellRenderer: ActionUserManagementComponent,
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
  rowData: any;
  totalElement: any;
  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }
  search(){
    this.userService.searchUser(this.dataSearch).subscribe((res:any)=>{
      this.rowData = res.data.content.map((item:any) =>{
        item.createTime = new Date(item.createTime*1000)
        item.currentLogin = new Date(item.currentLogin*100)
        return item;
      })
      this.totalElement = res.data.totalElements;
      this.totalPage = res.data.totalPages;
    })
  }
  callInforReview(empty:any,event:any){
    this.dataSearch.page=event;
    this.search();
  }
  openCreate(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      height: '80vh',
      width:'60vw',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: true
      }
    };
    this.dialog.open(CreateUpdateUserComponent, dialogConfig).afterClosed().subscribe((data:any)=>
        {
          this.search()
        }
    )
  }
}
