import {Component, OnInit, TemplateRef} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CategoriesService} from "./categories.service";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateRoleComponent} from "../role-management/create-update-role/create-update-role.component";
import {CreateUpdateCategoriesComponent} from "./create-update-categories/create-update-categories.component";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss']
})
export class CategoriesManagementComponent implements OnInit{
  displayedColumns: string[] = ['categoriCode','categoriName', 'createTime','status','description','action'];

  action :any;

  private transformer = (node: any, level: number) => {
    return {
      id:node.id,
      categoriName:node.categoriName,
      categoriCode:node.categoriCode,
      parentId:node.parentId,
      createTime:node.createTime,
      description:node.description,
      status:node.status,
      expandable: !!node.children && node.children.length > 0,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node: ExampleFlatNode) => node.level,
    (node: ExampleFlatNode) => node.expandable
  );

  treeFlattener = new MatTreeFlattener<any, any>(
    this.transformer,
    (node: any) => node.level,
    (node: any) => node.expandable,
    (node: any) => node.children
  );

  dataSource = new MatTreeFlatDataSource<any, any>(
    this.treeControl,
    this.treeFlattener
  );


  constructor(private categoriService:CategoriesService,
              public matdialog:MatDialog,
              public toast:ToastrService,
              private userService:UserService) {
    this.userService.getAction().subscribe((res:any)=>{
      this.action = res;
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  itemStatus=[
    {
      name: "Hoạt động",
      code: "1",
      color: "green"
    },
    {
      name: "Không hoạt động",
      code:"0",
      color: "red",
    }
  ];
  formSearch={
    status : null,
    keySearch:""
  }
  rowData:any;
  ngOnInit(): void {
    this.search()
  }

  protected readonly NO_ROW_GRID_TEMPLATE = NO_ROW_GRID_TEMPLATE;

  search() {
    this.categoriService.apiGetDataTree(this.formSearch).subscribe((data:any)=>{
      this.dataSource.data=data.data;
    })
  }

  openCreate() {
    const dialogConfig: MatDialogConfig<{ isCreate: boolean}> = {
      height: '500px',
      width:'600px',
      data: {
        isCreate: true
      }
    };
    this.matdialog.open(CreateUpdateCategoriesComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {this.search()}
    )
  }

  updateCategories(data:any) {
    const dialogConfig: MatDialogConfig<{ isCreate: boolean;itemData: any }> = {
      height: '500px',
      width:'600px',
      data: {
        isCreate: false,
        itemData: data
      }
    };
    this.matdialog.open(CreateUpdateCategoriesComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {this.search()}
    )
  }

  categoriesDelete:any
  openModal(template: TemplateRef<any>, data:any) {
    console.log("Data delete: ", data)
    this.categoriesDelete=data;
    const dialogConfig= {
      disableClose: false,
      hasBackdrop: true,
      width: '450px',
      borderRadius:'10px'
    };
    this.matdialog.open(template,dialogConfig).afterClosed().subscribe(()=>{
      this.categoriesDelete=null;
    })
  }

  deleteCategories() {
    this.categoriService.deleteCategories(this.categoriesDelete?.id).subscribe((res:any)=>{
      if(res.status==='OK'){
        this.toast.success("Xóa danh mục thành công")
      }else {
        this.toast.error(res.message)
      }
    });
  }
}

interface ExampleFlatNode {
  id:number;
  categoriName:string;
  categoriCode:string;
  parentId?:number;
  createTime?:any;
  description?:string;
  status?:number;
  expandable: boolean;
  name: string;
  count?: number;
  level: number;
}
