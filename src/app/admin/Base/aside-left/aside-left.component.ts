import { Component } from '@angular/core';
import {menuleft} from "../../../../helpers/constants";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {BreadcrumbService} from "../../../../core/_base/layout/service/breadcrumb.service";
import {Router} from "@angular/router";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

interface MenuNode{
  name: string;
  child?: MenuNode[];
  class?: string;
  router?:string;
  hasChild: boolean;
  isExpand?: boolean;
}

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
//       },
//       {
//         name: 'Orange',
//         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
//       },
//     ],
//   },
// ];

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
export class AsideLeftComponent {
  isExpand = true;

  menuItem = menuleft
  closeOpenMenu(){
    this.isExpand=!this.isExpand;
    this.treeControl.collapseAll();
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
  // dataSource:any;
  constructor(private breadCrumService: BreadcrumbService, private router: Router) {
    this.dataSource.data = this.menuItem;
    console.log("Data source: ",this.dataSource)
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.hasChild;

  navLinkComponent(router : any){
    console.log("Navigate to: ", router);

    this.getLocationMenu(this.menuItem, router.name);

    this.router.navigate([router.router], {})
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
}
