import { Component } from '@angular/core';
import {ColDef} from "ag-grid-community";
import {ActionRoleManagementComponent} from "./action-role-management/action-role-management.component";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent {


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

  roles=[
    {
      code:"R101",
      name: "Role 01",
      status: 0,
      numberUser: 100,
      description: "Role 01 abc abc abc",
      createDate: "12/2/2024",
      updateDate: "13/3/2024"
    },{
      code:"R101",
      name: "Role 01",
      status: 0,
      numberUser: 100,
      description: "Role 01 abc abc abc",
      createDate: "12/2/2024",
      updateDate: "13/3/2024"
    },{
      code:"R101",
      name: "Role 01",
      status: 0,
      numberUser: 100,
      description: "Role 01 abc abc abc",
      createDate: "12/2/2024",
      updateDate: "13/3/2024"
    },{
      code:"R101",
      name: "Role 01",
      status: 0,
      numberUser: 100,
      description: "Role 01 abc abc abc",
      createDate: "12/2/2024",
      updateDate: "13/3/2024"
    }
  ]

  columdef: any= [
    {
      headerName: 'STT',
      valueGetter: (param:any) => {
          return (param.node.rowIndex + 1)
      },
      pinned: 'left',
    },
    { headerName: 'Mã role', field: 'code' },
    { headerName: 'Tên role', field: 'name' },
    { headerName: 'Số tài khoản sử dụng', field: 'numberUser' },
    { headerName: 'Mô tả', field: 'description' },
    { headerName: 'Ngày tạo', field: 'createDate' },
    { headerName: 'Ngày cập nhật', field: 'updateDate' },
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
}
