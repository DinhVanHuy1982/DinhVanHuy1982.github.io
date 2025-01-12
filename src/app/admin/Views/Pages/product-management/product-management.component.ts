import {Component, OnInit} from '@angular/core';
import {TreeviewItem} from "ngx-treeview";
import {ProductService} from "./product.service";
import {ToastrService} from "ngx-toastr";
import {ActionProductComponent} from "./action-product/action-product.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateRoleComponent} from "../role-management/create-update-role/create-update-role.component";
import {CreateUpdateProductComponent} from "./create-update-product/create-update-product.component";
import {FormControl} from "@angular/forms";
import {BrandService} from "../brand-management/brand.service";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {UserService} from "../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit{
  action:any;
  constructor(private prductService: ProductService,
              private toast:ToastrService,
              private dialog : MatDialog,
              private brandService: BrandService,
              private userService:UserService
  ) {
    this.userService.getAction().subscribe((res:any)=>{
      console.log("Action: ",res)
      this.action = res;
    })
  }
  noRowsTemplate = NO_ROW_GRID_TEMPLATE;

  columnDef:any = [{
    headerName: 'STT',
    valueGetter: (param:any) => {
      return (param.node.rowIndex + 1)+ (this.formSearch.page-1)*10
    },
    width: 100,
    pinned: 'left',
  },{
    headerName: "Mã sản phẩm",
    field: "productCode",
    headerTooltip: "Mã sản phẩm",
    tooltipField: 'productCode',
  },{
    headerName: "Tên sản phẩm",
    field: "productName",
    headerTooltip: "Tên sản phẩm",
    tooltipField: 'productName',
  },{
    headerName: "Số lượng",
    field: "quantity",
    headerTooltip: "Số lượng",
    tooltipField: 'quantity',
  },{
    headerName: "Giá sản phẩm",
    field: "price",
    headerTooltip: "Giá sản phẩm",
    tooltipField: 'price',
  },{
    headerName: "Danh mục",
    field: "categoriesName",
    headerTooltip: "Danh mục",
    tooltipField: 'categoriesName',
  },{
    headerName: "Nhãn hiệu",
    field: "brandName",
    headerTooltip: "Nhãn hiệu",
    tooltipField: 'brandName',
  },{
    headerName: 'Action',
    cellRenderer: ActionProductComponent,
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
  searchProduct(){
    this.formSearch.page=1;
    this.search();
  }
  callInforReview(noaction:any,page: any){
    this.formSearch.page=page;
    this.search();
  }

  createProduct(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      height: '600px',
      width: '600px',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: true
      }
    };
    this.dialog.open(CreateUpdateProductComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {
        this.search()
      }
    )
  }

  nodes = [
    {
      text: 'Node 1',
      children: [
        { text: 'Node 1.1' },
        { text: 'Node 1.2' }
      ]
    },
    {
      text: 'Node 2',
      children: [
        { text: 'Node 2.1' },
        { text: 'Node 2.2' }
      ]
    }
  ];

  treeConfig = {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500
  };

  onNodeSelected(event: any) {
    console.log('Selected Node:', event);
  }
  pokemonControl = new FormControl('');
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'},
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        {value: 'charmander-6', viewValue: 'Charmander'},
        {value: 'vulpix-7', viewValue: 'Vulpix'},
        {value: 'flareon-8', viewValue: 'Flareon'},
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        {value: 'mew-9', viewValue: 'Mew'},
        {value: 'mewtwo-10', viewValue: 'Mewtwo'},
      ],
    },
  ];
  protected readonly NO_ROW_GRID_TEMPLATE = NO_ROW_GRID_TEMPLATE;
}
interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}
