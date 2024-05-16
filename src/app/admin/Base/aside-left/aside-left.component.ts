import {Component, OnInit} from '@angular/core';
import {menuleft} from "../../../../helpers/constants";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {BreadcrumbService} from "../../../../core/_base/layout/service/breadcrumb.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../viewsShare/Views/user.service";

interface MenuNode{
  name: string;
  child?: MenuNode[];
  class?: string;
  router?:string;
  hasChild: boolean;
  isExpand?: boolean;
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  // expandable: boolean;
  name: string;
  level: number;
  class?: string | undefined;
  router?:string;
  hasChild: boolean;
  isExpand?: boolean;
}
@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss']
})
export class AsideLeftComponent implements OnInit{
  isExpand = true;

  // menuItem = menuleft
  allMenu = menuleft.map(item => ({ ...item }));
  closeOpenMenu(){
    this.isExpand=!this.isExpand;
    if(!this.isExpand){
      // this.menuItem = this.menuItem.forEach(item =>  item.targetitem.target=null)
        this.menuItem = menuleft.map((item:any) => ({ ...item }));
      for(let item of this.menuItem){
        if(item.target){
          item.target=undefined;
        }
      }

        console.log("Close menu :", this.menuItem);
    }else{
        this.menuItem = menuleft.map((item:any) => ({ ...item }));
        console.log("Open menu : ", this.menuItem);
    }
    // this.treeControl.collapseAll();
  }
  expandMenuItem(item : any){
    item.isExpand=!item.isExpand;
  }


  private _transformer = (node: MenuNode, level: number) => {
    const flatNode: ExampleFlatNode = {
      ...node,
      level: level
    };
    return flatNode;
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.hasChild
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.hasChild,
    node => node.child
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  currentUser:any;
  menuItem:any;
  // dataSource:any;
  constructor(private breadCrumService: BreadcrumbService,
              private router: Router,
              private toast:ToastrService,
              private userService:UserService) {
    this.menuItem = [...this.allMenu];
   this.userService.getUserCurrent().subscribe((user:any)=>{
     this.currentUser = user;
     this.menuItem = this.filterMenuItems(this.menuItem,this.currentUser.lstFunctionCode)
   })
  }

  getLocationMenu(node: any, nameNode: string):string[]{
    const arrNode : string[] = [];
    console.log("Node find: ", node, nameNode);


    const homeParentNodes = this.findParentNodesWithNameInAllElements(this.menuItem, nameNode); // Tìm trên tất cả các phần tử trong TREE_DATA

    console.log("homeParentNodes",homeParentNodes);
    this.breadCrumService.setBreadcrumb(homeParentNodes);

    return arrNode;
  }

  findParentNodesWithNameInAllElements(treeData: MenuNode[], targetName: string): string[] {
    for (const node of treeData) {
      const result = this.findParentNodesWithName(node, targetName);
      if (result.length > 0) {
        return result;
      }
    }
    return [];
  }

  findParentNodesWithName(node: MenuNode, targetName: string, path: string[] = []): string[] {
    if (node.name === targetName) {
      path.push(node.name);
      return path;
    }

    if (node.child) {
      for (const childNode of node.child) {
        const result = this.findParentNodesWithName(childNode, targetName, [...path, node.name]);
        if (result.length > 0) {
          return result;
        }
      }
    }

    return [];
  }
  navigateMenu(item:any){
      const  userStr = localStorage.getItem("user");
      if(userStr){
        const user = JSON.parse(userStr);
        let checkAccessScreen=false;
        user.rolesDTO.listFunction.forEach((itemRole:any)=>{
          if(item.code===itemRole.functionCode){
            checkAccessScreen=true;
            this.userService.setAction(itemRole)
          }
        })
        if(checkAccessScreen){
          console.log("Item screen: ", item)
          console.log("Navigate to : ", item.router)
          this.getLocationMenu(this.menuItem, item.name);
          this.router.navigate([item.router],{})
        }else {
          this.toast.warning("Bạn không có quyền truy cập chức năng này")
        }
      }
      const menuAllow  = this.filterMenuItems(menuleft,this.allowedCodes)
    console.log("MenuAllow: ", menuAllow)

  }
  allowedCodes :any[]=[];
  filterMenuItems(items: any[], allowedCodes: string[]): any[] {
    return items
      .map((item:any) => {
        if (item.hasChild && item.child) {
          // Lọc các phần tử con
          item.child = this.filterMenuItems(item.child, allowedCodes);
          // Giữ lại phần tử cha nếu có bất kỳ phần tử con nào hợp lệ
          return item.child.length > 0 ? item : null;
        } else {
          // Kiểm tra phần tử chính
          return allowedCodes.includes(item.code) ? item : null;
        }
      })
      .filter((item:any) => item !== null);
  }

  ngOnInit(): void {
    this.dataSource.data = this.menuItem;
    console.log("Data source: ",this.dataSource)
    console.log("Menu Item: ",this.menuItem)
  }
}
