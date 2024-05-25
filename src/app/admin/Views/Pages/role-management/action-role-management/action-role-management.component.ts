import {ChangeDetectorRef, Component, TemplateRef, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";
import {CreateUpdateRoleComponent} from "../create-update-role/create-update-role.component";
import {RolesService} from "../roles.service";
import {RoleManagementComponent} from "../role-management.component";
import {UserService} from "../../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-action-role-management',
  templateUrl: './action-role-management.component.html',
  styleUrls: ['./action-role-management.component.scss']
})
export class ActionRoleManagementComponent implements ITooltipAngularComp {

  private params!: any;
  public data!: any;
  public color!: string;
  positionFixed = false;

  hasImage: boolean = false;

  renderContent: MathContent = {
    latex: '',
    mathml: '',
  };

  agInit(params: any): void {
    this.params = params;
    this.data = params.data;
  }
  action:any;

  constructor(
              private toast: ToastrService,
              public matDialog: MatDialog,
              private translate: TranslateService,
              private cd: ChangeDetectorRef,
              private roleService: RolesService,
              private roleManagement: RoleManagementComponent,
              private userService:UserService
  ) {
    this.userService.getAction().subscribe((res:any)=>{
      this.action = res;
    })

  }


  updateRole() {
    const dialogConfig: MatDialogConfig<{ isCreate: boolean;itemData: any }> = {
      height: '800px',
      maxHeight: '90vh',
      width: '800px',
      maxWidth: '90vw',
      data: {
        isCreate: false,
        itemData: this.data
      }
    };
    this.matDialog.open(CreateUpdateRoleComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {}
    )
  }
  disableDelete = true;
  deleteLibCategory(){

  }
  openModal(template: TemplateRef<any>) {
    this.disableDelete = false;
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'addnew-unit-md modal-dialog-custom delete-lib-cate modal-topic-exam-package' })
    // );
    this.matDialog.open(this.template, {
      disableClose: false,
      hasBackdrop: true,
      width: '464px',
      maxHeight: '90vh',
      autoFocus: false,
      // panelClass: ['addnew-unit-md modal-dialog-custom delete-lib-cate modal-topic-exam-package']
    })
  }
  @ViewChild('template') template :any;

  deleteRole(){
    if(this.data.userUse>0){
      this.toast.warning("Có tài khoản đang sử dụng role này")
    }else{
      this.roleService.deleteRole(this.data.id).subscribe((data:any)=>{
        if(data.status==='OK'){
          this.roleManagement.search();
          this.toast.success(data.message);
          this.matDialog.closeAll();
        }else{
          this.toast.error(data.message)
        }
      })
    }
  }
}
export interface MathContent {
  latex?: string;
  mathml?: string;
}
