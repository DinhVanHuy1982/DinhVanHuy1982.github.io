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

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit{

  public treeItems: TreeviewItem[];
  constructor(private prductService: ProductService,
              private toast:ToastrService,
              private dialog : MatDialog,
              private brandService: BrandService
  ) {
    this.treeItems = [
      new TreeviewItem({ text: 'Parent 1', value: 1, children: [
          { text: 'Child 1.1', value: 11 },
          { text: 'Child 1.2', value: 12 }
        ]}),
      new TreeviewItem({ text: 'Parent 2', value: 2, children: [
          { text: 'Child 2.1', value: 21 },
          { text: 'Child 2.2', value: 22 }
        ]})
    ];
  }
  noRowsTemplate = NO_ROW_GRID_TEMPLATE;

  columnDef:any = [{
    headerName: 'STT',
    valueGetter: (param:any) => {
      return (param.node.rowIndex + 1)
    },
    width: 100,
    pinned: 'left',
  },{
    headerName: "Mã sản phẩm",
    field: "productCode",
  },{
    headerName: "Tên sản phẩm",
    field: "productName",
  },{
    headerName: "Số lượng",
    field: "quantity",
  },{
    headerName: "Giá",
    field: "price",
  },{
    headerName: "Danh mục",
    field: "categoriesName",
  },{
    headerName: "Nhãn hiệu",
    field: "brandName",
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
  callInforReview(noaction:any,page: any){
    this.formSearch.page=page;
    this.search();
  }

  createProduct(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; }> = {
      height: '80vh',
      width: '60vw',
      maxHeight: '90vh',
      maxWidth: '90vw',
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
