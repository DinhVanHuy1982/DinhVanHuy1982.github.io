import { Component } from '@angular/core';
import {TreeviewItem} from "ngx-treeview";
import {ProductService} from "../product-management/product.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BrandService} from "../brand-management/brand.service";
import {ActionProductComponent} from "../product-management/action-product/action-product.component";
import {
  CreateUpdateProductComponent
} from "../product-management/create-update-product/create-update-product.component";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {CreateImportProductComponent} from "./create-import-product/create-import-product.component";
import {ActionImportProductComponent} from "./action-import-product/action-import-product.component";
import {UserService} from "../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-import-product-management',
  templateUrl: './import-product-management.component.html',
  styleUrls: ['./import-product-management.component.scss']
})
export class ImportProductManagementComponent {
  action:any;
  constructor(private prductService: ProductService,
              private toast:ToastrService,
              private dialog : MatDialog,
              private brandService: BrandService,
              private userService:UserService
  ) {
    this.userService.getAction().subscribe((res:any)=>{
      this.action = res;
    })
  }
  noRowsTemplate = NO_ROW_GRID_TEMPLATE;

  columnDef:any = [{
    headerName: 'STT',
    valueGetter: (param:any) => {
      return ((param.node.rowIndex + 1)+((this.formSearch.page-1)*this.formSearch.pageSize))
    },
    width: 100,
    pinned: 'left',
  },{
    headerName: "Mã sản phẩm",
    field: "productCode",
    headerTooltip: "Mã sản phẩm",
    tooltipField: 'productCode'
  },{
    headerName: "Tên sản phẩm",
    field: "productName",
    headerTooltip: "Tên sản phẩm",
    tooltipField: 'productName'
  },{
    headerName: "Số lượng",
    field: "quantity",
    headerTooltip: "Số lượng",
    tooltipField: 'quantity'
  },{
    headerName: "Giá",
    field: "price",
    headerTooltip: "Giá",
    tooltipField: 'price'
  },{
    headerName: "Danh mục",
    field: "categoriesName",
    headerTooltip: "Danh mục",
    tooltipField: 'categoriesName'
  },{
    headerName: "Nhãn hiệu",
    field: "brandName",
    headerTooltip: "Nhãn hiệu",
    tooltipField: 'brandName'
  },{
    headerName: 'Action',
    cellRenderer: ActionImportProductComponent,
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
  }]
  formSearch = {
    nameSearch : "",
    brandId: null,
    categoriesId: null,
    page:1,
    pageSize:10
  }
  rowData: any;
  totalPage=0;
  totalElement= 0;
  listBrand:any;
  ngOnInit(): void {
    this.search();
    this.brandService.getListBrand().subscribe((data:any)=>{
      this.listBrand=data.map((item:any)=>{
        return {
          id: item.id,
          nameTranform: item.brandCode + " - "+ item.brandName
        }
      });
    })
  }

  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }
  search(){
    console.log("Tìm kiếm")
    this.prductService.getProduct(this.formSearch).subscribe((data:any)=> {
      if (data.status === "OK") {
        this.rowData=data.data.content;
        this.totalElement = data.data.totalElements;
        this.totalPage = data.data.totalPages
      }else{
        this.toast.error("Lỗi trong quá trình xử lý");
      }
    })
  }
  callInforReview(noaction:any,page: any){
    this.formSearch.page=page;
    this.search();
  }

  createProduct(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      height: '700px',
      width: '60vw',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: true
      }
    };
    this.dialog.open(CreateImportProductComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {
        this.search()
      }
    )
  }



  protected readonly NO_ROW_GRID_TEMPLATE = NO_ROW_GRID_TEMPLATE;

}
