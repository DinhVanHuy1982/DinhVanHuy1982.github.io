import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "./categories.service";
import {TranslateService} from "@ngx-translate/core";
import {ColDef, GridOptions} from "ag-grid-community";

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss']
})
export class CategoriesManagementComponent implements OnInit{

  constructor() {}
  rowData = [
    {
      "id": 1,
      "categoriName": "Bóng đá",
      "categoriCode": "FBSport",
      "parentId": null,
      "createTime": null,
      "description": null,
      "status": null,
      "children": []
    },
    {
      "id": 2,
      "categoriName": "Bóng đá trong nhà",
      "categoriCode": "FBSportInHouse",
      "parentId": null,
      "createTime": null,
      "description": null,
      "status": null,
      "children": [
        {
          "id": 3,
          "categoriName": "Cầu lông",
          "categoriCode": "BADMINTON",
          "parentId": 2,
          "createTime": null,
          "description": null,
          "status": null,
          "children": [
            {
              "id": 4,
              "categoriName": "Vợt cầu lông",
              "categoriCode": "BADMINTONPLAY",
              "parentId": 3,
              "createTime": null,
              "description": null,
              "status": null,
              "children": []
            }
          ]
        }
      ]
    }
  ];

  ngOnInit(): void {
  }
  public columnDefs:any = [
    { headerName: "Mã danh mục",
      field: 'categoriCode',
      cellRenderer: 'agGroupCellRenderer', },
    { headerName: "Tên danh mục", field: "categoriName" },
    { headerName: "Mô tả", field: "description" },
  ];
  public gridOptions:any = {
    rowSelection: 'multiple',
    groupSelectsChildren: true,
    groupSelectsFiltered: true,
    suppressAggFuncInHeader: true,
    suppressRowClickSelection: true,
    autoGroupColumnDef: {headerName: "Chủ đề cha", field: "parentId", width: 200,
      cellRenderer:'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
      }
    },
    getNodeChildDetails: function getNodeChildDetails(rowItem:any) {
      console.log(rowItem)
      if (rowItem.children) {
        console.log(rowItem.children)
        return {
          group: true,
          // open C be default
          expanded: true,
          // provide ag-Grid with the children of this group
          children: rowItem.children,
          // the key is used by the default group cellRenderer
          key: rowItem.categoriCode
        };
      } else {
        return null;
      }
    },

  };
  onGridReady(params:any) {

  }
  // rowData:any;
  // constructor(private translateService: TranslateService, private categoriesService: CategoriesService) {}
  // ngOnInit(): void {
  //   this.rowData = [];
  //   this.categoriesService.apiGetDataTree().subscribe((res:any) => {
  //     this.rowData = res.data;
  //     console.log(this.rowData)
  //   });
  // }
  // public columnDefs = [
  //   { headerName: "Mã danh mục", field: 'categoriCode',cellRenderer: 'agGroupCellRenderer', },
  //   { headerName: "Tên danh mục", field: "categoriName" },
  //   { headerName: "Mô tả", field: "description" },
  // ];
  // public gridOptions:any = {
  //   rowSelection: 'multiple',
  //   groupSelectsChildren: true,
  //   groupSelectsFiltered: true,
  //   suppressAggFuncInHeader: true,
  //   suppressRowClickSelection: true,
  //   autoGroupColumnDef: {headerName: "Chủ đề cha", field: "parentId", width: 200,
  //     cellRenderer:'agGroupCellRenderer',
  //     cellRendererParams: {
  //       checkbox: true
  //     }
  //   },
  //   getNodeChildDetails: function getNodeChildDetails(rowItem:any) {
  //     console.log(rowItem)
  //     if (rowItem.children) {
  //       console.log(rowItem.children)
  //       return {
  //         group: true,
  //         // open C be default
  //         expanded: true,
  //         // provide ag-Grid with the children of this group
  //         children: rowItem.children,
  //         // the key is used by the default group cellRenderer
  //         key: rowItem.categoriCode
  //       };
  //     } else {
  //       return null;
  //     }
  //   },
  //
  // };
  // onGridReady(params:any) {
  //
  // }
  // getNodeChildDetails(rowItem: any) {
  //   if (rowItem.children) {
  //     return {
  //       group: true,
  //       expanded: true,
  //       children: rowItem.children,
  //       key: rowItem.categoriCode
  //     };
  //   } else {
  //     return null;
  //   }
  // }
}
interface CategoryNode {
  id: number;
  categoriName: string;
  categoriCode: string;
  parentId: number | null;
  children?: CategoryNode[];
}
interface CategoryFlatNode {
  id: number;
  name: string;
  code: string;
  parentId: number | null;
  level: number;
  expandable: boolean;
}


// rowData:any;
// ngOnInit(): void {
//   this.rowData = [
//     {
//       "id": 1,
//       "categoriName": "Bóng đá",
//       "categoriCode": "FBSport",
//       "parentId": null,
//       "createTime": null,
//       "description": null,
//       "status": null,
//       "children": []
//     },
//     {
//       "id": 2,
//       "categoriName": "Bóng đá trong nhà",
//       "categoriCode": "FBSportInHouse",
//       "parentId": null,
//       "createTime": null,
//       "description": null,
//       "status": null,
//       "children": [
//         {
//           "id": 3,
//           "categoriName": "Cầu lông",
//           "categoriCode": "BADMINTON",
//           "parentId": 2,
//           "createTime": null,
//           "description": null,
//           "status": null,
//           "children": [
//             {
//               "id": 4,
//               "categoriName": "Vợt cầu lông",
//               "categoriCode": "BADMINTONPLAY",
//               "parentId": 3,
//               "createTime": null,
//               "description": null,
//               "status": null,
//               "children": []
//             }
//           ]
//         }
//       ]
//     }
//   ]
//   // this.categoriesService.apiGetDataTree().subscribe((res:any) => {
//   //   this.rowData = res.data;
//   //   console.log(this.rowData)
//   // });
// }
// public columnDefs = [
//   { headerName: "Mã danh mục", field: 'categoriCode' },
//   { headerName: "Tên danh mục", field: "categoriName" },
//   { headerName: "Mô tả", field: "description" },
// ];
// public gridOptions:any = {
//   rowSelection: 'multiple',
//   groupSelectsChildren: true,
//   groupSelectsFiltered: true,
//   suppressAggFuncInHeader: true,
//   suppressRowClickSelection: true,
//   autoGroupColumnDef: {headerName: "Chủ đề cha", field: "parentId", width: 200,
//     cellRenderer:'agGroupCellRenderer',
//     cellRendererParams: {
//       checkbox: true
//     }
//   },
//   getNodeChildDetails: function getNodeChildDetails(rowItem:any) {
//     console.log(rowItem)
//     if (rowItem.children) {
//       console.log(rowItem.children)
//       return {
//         group: true,
//         // open C be default
//         expanded: false,
//         // provide ag-Grid with the children of this group
//         children: rowItem.children,
//         // the key is used by the default group cellRenderer
//         key: rowItem.categoriCode
//       };
//     } else {
//       return null;
//     }
//   },
//
// };
// onGridReady(params:any) {
//
// }
