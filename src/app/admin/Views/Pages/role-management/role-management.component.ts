import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {ActionRoleManagementComponent} from "./action-role-management/action-role-management.component";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {RolesService} from "./roles.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateRoleComponent} from "./create-update-role/create-update-role.component";

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit{

  dataSearch = {
    roleSearchName:null,
    status:null,
    page:1
  }
  totalRecord =0;
  totalPage =0;
  rowData = [];

  constructor(private roleService:RolesService,
              private toast:ToastrService,
              private datePipe: DatePipe,
              private matdialog:MatDialog) {
  }
  noRowsTemplate = NO_ROW_GRID_TEMPLATE

  item=[
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
  ngOnInit(): void {
      this.search();
  }

  columdef: any= [
    {
      headerName: 'STT',
      valueGetter: (param:any) => {
          return (param.node.rowIndex + 1)
      },
      width: 100,
      pinned: 'left',
    },
    { headerName: 'Mã role', field: 'roleCode' },
    { headerName: 'Tên role', field: 'roleName' },
    { headerName: 'Số tài khoản sử dụng', field: 'userUse' },
    { headerName: 'Người tạo', field: 'createName' },
    { headerName: 'Người cập nhật', field: 'updateName' },
    {
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
    },
    { headerName: 'Mô tả', field: 'description' },
    { headerName: 'Ngày tạo', field: 'createTime' },
    { headerName: 'Ngày cập nhật', field: 'updateTime' },
    {
      headerName: 'Action',
      cellRenderer: ActionRoleManagementComponent,
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
  gridApi:any;
  gridColumnApi: any;

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showNoRowsOverlay();
  }

  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }


  search(){
    this.roleService.getRole(this.dataSearch).subscribe((data:any)=>{
      if(data.status=='OK'){
        const roleData = data.data.content;
        this.rowData = roleData.map((item:any) => {
          console.log(item)
          item.createTime = this.datePipe.transform(new Date(item.createTime * 1000), 'dd/MM/yyyy');
          if(item.status==null){
            item.status=0;
          }
          if(item?.updateTime) this.datePipe.transform(new Date(item?.updateTime * 1000), 'dd/MM/yyyy');
          if(item.userUse==null) item.userUse = 0;
          return item
        })
        this.totalRecord = data.data?.totalElements;
        this.totalPage = data.data?.totalPages;
        console.log(this.rowData)
      }
    },(error:any) => {
      this.toast.error("Có lỗi trong quá trình xử lý");
    })
  }
  callInforReview(data:any,event:any){
    console.log("Data: ",data,"Event: ",event)
    this.dataSearch.page=event;
    this.search()
  }
  openCreate(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      height: '60vh',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: true
      }
    };
    this.matdialog.open(CreateUpdateRoleComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {
        this.search()
      }
    )
  }
}
