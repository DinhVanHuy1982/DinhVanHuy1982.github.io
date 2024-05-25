import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RolesService} from "../roles.service";
import {ToastrService} from "ngx-toastr";
import {ValidateInput} from "../../../../../../core/service/model/validate-input.model";
import {CommonFunction} from "../../../../../../core/service/utils/common-function";

@Component({
  selector: 'app-create-update-role',
  templateUrl: './create-update-role.component.html',
  styleUrls: ['./create-update-role.component.scss']
})
export class CreateUpdateRoleComponent implements OnInit{

  itemActive=[
    {
      name: "Hoạt động",
      code: 1,
      color: "green"
    },
    {
      name: "Không hoạt động",
      code:0,
      color: "red",
    }
  ];
  roleUpdate: any;
  roleCode :any;
  roleName : any;
  roleStatus= 1;
  roleDescription:any;
  formCreateUpdate:any
  roleData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialog:MatDialogRef<CreateUpdateRoleComponent>,
              private roleService: RolesService,
              private toast: ToastrService,
              private change:ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if(this.data?.isCreate){
      this.roleService.getListFunctionCreate().subscribe((data:any)=>{
        console.log("List function: ", data)
        if(data.status==="OK"){
          this.roleData = data.data;
          this.roleData.forEach((item:any)=> item.checkApplyFunction=false)
        }else{
          this.toast.error(data.message);
        }
      })
    }else{
      this.roleService.getDetailRole(this.data.itemData.id).subscribe((data:any)=>{
        if(data.status==="OK"){
          this.roleUpdate = data.data;
          this.roleName = this.roleUpdate?.roleName;
          this.roleCode = this.roleUpdate?.roleCode;
          this.roleDescription = this.roleUpdate?.description
          this.roleStatus = this.roleUpdate?.status;
          this.roleData = this.roleUpdate?.lstFunction;
          this.roleData.forEach((item:any) =>{
            item.optionSelected = item.listActionDTO.map((action:any)=>{
              if(action.selected===1){
                return action
              }
            }).filter((selectedAction: any) => selectedAction !== undefined)
            console.log(item.optionSelected)
          } )
          console.log("RoleData update: ", this.roleData)
        }
      })
    }
  }
  toggleApply(item:any, event:any){
    console.log("Function: ", item)
    if(!item.checkApplyFunction){
      item.optionSelected=[]
    }else{
      item.optionSelected= [item.listActionDTO[3]]
      this.change.detectChanges()
    }

    // item.
  }

  changeAction(event:any,indexFn:any, fn:any){
    event.forEach((item:any) => item.isSelected=true);

    let check = false;
    for(let i = 0; i<event.length;i++){
      if(event[i].code=='search'){
        check=true;
      }
    }
    if(!check){
      this.toast.warning("Không được bỏ action tìm kiếm")
      this.roleData[indexFn].optionSelected.push(fn.listActionDTO[3])
      this.roleData[indexFn].optionSelected = [...this.roleData[indexFn].optionSelected];
    }

    console.log("Event: ", event);
    console.log("roleData: ", this.roleData);
  }
  createRole(){

    this.validateRole()
    if(!this.errRoleCode.done || !this.errRoleName.done || this.errDescription?.maxLength || this.errFunctionApply){
      return;
    }

    const listRolesDetailsDTO =[];

    for(let i =0;i<this.roleData.length;i++){
      let item = this.roleData[i];

      const functionCreate = {
        functionId:item.id,
        action:""
      }
      let selectedIds:number[] = [];
      item?.listActionDTO.forEach((action:any) => {
        // Kiểm tra điều kiện isSelected=true
        if (action.isSelected === true) {
          // Nếu điều kiện được thỏa mãn, thêm ID vào mảng selectedIds
          selectedIds.push(action.id);
        }
      });
      functionCreate.action = selectedIds.join(',');
      if(functionCreate.action!==""){
        listRolesDetailsDTO.push(functionCreate)
      }
    }
     listRolesDetailsDTO.map((item:any) =>{
      if(item?.action!==""){
        return item;
      }
    })
    this.formCreateUpdate ={
      roleName: this.roleName,
      roleCode : this.roleCode,
      status: this.roleStatus,
      description: this.roleDescription,
      listRolesDetailsDTO: listRolesDetailsDTO
    }

    console.log("CreateFinal: ",this.formCreateUpdate )

    this.roleService.createRole(this.formCreateUpdate).subscribe((result:any)=>{
      if(result.status=="OK"){
        this.toast.success("Thêm mới role thành công")
        this.dialog.close()
      }else{
        this.toast.error(result.message)
      }
    })

    // this.formCreateUpdate.listRolesDetailsDTO = listRolesDetailsDTO;
    // console.log("DataCreate: ", this.formCreateUpdate)
    // console.log("Role data: ",this.roleData)
  }

  update(){
    console.log("Roledata Update: ", this.roleData)

    const listRolesDetailsDTO =[];
    for( let i =0 ;i<this.roleUpdate?.lstFunction.length;i++){
      let item = this.roleUpdate.lstFunction[i];
      const functionCreate = {
        functionId:item.id,
        action:""
      }
      let selectedIds:number[] = [];
      item.optionSelected.forEach((action:any)=>{
        selectedIds.push(action.id)
      })
      functionCreate.action = selectedIds.join(',');
      listRolesDetailsDTO.push(functionCreate);
    }


    // for(let i =0;i<this.roleData.length;i++){
    //   let item = this.roleData[i];
    //
    //   const functionCreate = {
    //     functionId:item.id,
    //     action:""
    //   }
    //   let selectedIds:number[] = [];
    //   item?.optionSelected.forEach((action:any) => {
    //     // Kiểm tra điều kiện isSelected=true
    //     if (action.isSelected === true) {
    //       // Nếu điều kiện được thỏa mãn, thêm ID vào mảng selectedIds
    //       selectedIds.push(action.id);
    //     }
    //   });
    //   functionCreate.action = selectedIds.join(',');
    //   if(functionCreate.action!==""){
    //     listRolesDetailsDTO.push(functionCreate)
    //   }
    // }
    const roleFilter: any[] = [];
    listRolesDetailsDTO.forEach((item:any)=>{
      if(item.action !==""){
        roleFilter.push(item)
      }
    })
    this.formCreateUpdate ={
      id: this.roleUpdate.id,
      roleName: this.roleUpdate.roleName,
      roleCode : this.roleCode,
      status: this.roleStatus,
      description: this.roleDescription,
      listRolesDetailsDTO: roleFilter
    }
    this.roleService.updateRole(this.formCreateUpdate).subscribe((data:any)=>{
      if(data.status="OK"){
        this.toast.success("Cập nhật thành công")
        this.dialog.close();
      }else{
        this.toast.error(data.message)
      }
    })
    console.log("Form update: ", this.formCreateUpdate)
  }

  closeCreateUpdate(){
    this.dialog.close()
  }

  validateRole(){
    this.errRoleCode= new ValidateInput();
    this.errRoleName= new ValidateInput();
    this.errDescription= new ValidateInput();


    this.validateRoleCode();
    this.validateRoleName();
    this.validateDescription();
    this.validateFunction();
  }

  errRoleCode:ValidateInput= new ValidateInput();
  errRoleName:ValidateInput= new ValidateInput();
  errDescription:ValidateInput= new ValidateInput();
  validateRoleCode() {
    this.errRoleCode = CommonFunction.validateInputUTF8Space(this.roleCode, 50, null, true , true);
  }

  validateRoleName() {
    this.errRoleName = CommonFunction.validateInput(this.roleName, 50, null);
  }

  validateDescription() {
    this.errDescription = CommonFunction.validateInput(this.roleDescription, 1000, null);
  }
  errFunctionApply="";
  validateFunction(){
    this.errFunctionApply="Cần phải chọn ít nhất một function cho role";
    for(let i = 0 ;i<this.roleData.length;i++){
      if(this.roleData[i].checkApplyFunction){
        this.errFunctionApply="";
      }
    }
  }
}
export interface Action{
  id: number,
  action: ""
}
