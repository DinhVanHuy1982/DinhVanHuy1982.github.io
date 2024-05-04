import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {CartService} from "./cart.service";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  allComplete: boolean = false;
  domainFile = environment.DOMAIN_FILE_SERVER

  constructor(private cartService:CartService) {
  }
  task:Task  = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t:any) => (t.completed = completed));
  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t:any) => t.completed);
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem("user");
    if(userStr) {
      const user = JSON.parse(userStr)
      this.cartService.getAllCart(user?.id).subscribe((data:any)=>{
        this.rowData=data.data;
      })
    }
  }
  rowData:any;
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
