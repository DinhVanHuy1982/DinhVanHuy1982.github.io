import {Component, OnInit, TemplateRef} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CategoriesService} from "./categories.service";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../helpers/constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateRoleComponent} from "../role-management/create-update-role/create-update-role.component";
import {CreateUpdateCategoriesComponent} from "./create-update-categories/create-update-categories.component";

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss']
})
export class CategoriesManagementComponent implements OnInit{
  displayedColumns: string[] = ['categoriCode','categoriName', 'createTime','status','description','action'];

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
              public matdialog:MatDialog) {
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
      height: '60vh',
      maxHeight: '90vh',
      minWidth:'30vw',
      maxWidth: '90vw',
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
      height: '60vh',
      maxHeight: '90vh',
      minWidth:'30vw',
      maxWidth: '90vw',
      data: {
        isCreate: false,
        itemData: data
      }
    };
    this.matdialog.open(CreateUpdateCategoriesComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {this.search()}
    )
  }

  openModal(template: TemplateRef<any>) {
    this.matdialog.open(template)
  }

  deleteCategories() {

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
