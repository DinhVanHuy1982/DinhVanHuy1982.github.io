import { Component } from '@angular/core';
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateBrandComponent} from "../../brand-management/create-update-brand/create-update-brand.component";
import {UserManagementComponent} from "../user-management.component";
import {CreateUpdateUserComponent} from "../create-update-user/create-update-user.component";
import {UserService} from "../../../../../viewsShare/Views/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-action-user-management',
  templateUrl: './action-user-management.component.html',
  styleUrls: ['./action-user-management.component.scss']
})
export class ActionUserManagementComponent  implements ITooltipAngularComp {

  data:any
  constructor(
      public matdialog: MatDialog,
      private userComponent:UserManagementComponent,
      private userService:UserService,
      private toast:ToastrService) {

  }

  agInit(params: ITooltipParams): void {
    this.data=params.data;
  }

  updateUser() {
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; itemData:any}> = {
      height: '80vh',
      width: '50vw',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: false,
        itemData: this.data
      }
    };
    this.matdialog.open(CreateUpdateUserComponent, dialogConfig).afterClosed().subscribe((data:any)=>{
      this.userComponent.search();
    })
  }

  deleteUser() {
    this.userService.deleteUser(this.data.id).subscribe((res:any)=>{
        if(res.status=='OK'){
          this.matdialog.closeAll()
          this.toast.success("Xóa thành công")
        }      else{
          this.toast.error(res.message)
        }
    });
  }

  openModal(template: any) {
    const dialogConfig = {
      height: '200px',
      width: '500px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true
    };
    this.matdialog.open(template,dialogConfig).afterClosed().subscribe((close:any)=>{
      this.userComponent.search();
    })
  }
}
