import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CategoriesService} from "../categories.service";
import {ToastrService} from "ngx-toastr";
import {ValidateInput} from "../../../../../../core/service/model/validate-input.model";
import {CommonFunction} from "../../../../../../core/service/utils/common-function";

@Component({
  selector: 'app-create-update-categories',
  templateUrl: './create-update-categories.component.html',
  styleUrls: ['./create-update-categories.component.scss']
})
export class CreateUpdateCategoriesComponent implements OnInit{

  formCreateUpdate={
    id:null,
    categoriName:"",
    categoriCode:"",
    status:"1",
    parentId:null,
    description:""
  }
  lstParent:any;
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialog:MatDialog,
              private cateService:CategoriesService,
              private toast: ToastrService) {
    if(data.isCreate){

    }else{
      this.formCreateUpdate.id=data.itemData.id;
    }
  }
  ngOnInit(): void {

    if(!this.data.isCreate){
      this.cateService.getById(this.formCreateUpdate.id).subscribe((res:any)=>{
        if(res.status==="OK"){
          this.formCreateUpdate = res.data
        }else{
          this.toast.error(res.message)
          this.dialog.closeAll()
        }
      })
      this.cateService.apiGetDataTree(this.formCreateUpdate).subscribe((res:any)=>{
        this.formCreateUpdate.status="1";
        this.lstParent=res.data.map((item:any) => {
          item.tranform = item.categoriCode + " - " + item.categoriName
          return item;
        })
        console.log("Parent: ", this.lstParent)
        console.log("Data: ", this.formCreateUpdate)
      })
    }else{
      this.cateService.getNoTree().subscribe((res:any)=>{
        if(res.status==="OK"){
          this.lstParent = res.data.map((item:any) => {
            item.tranform = item.categoriCode + " - " + item.categoriName
            return item;
          })
        }else{
          this.toast.error(res.message)
          this.dialog.closeAll()
        }
      })
    }
  }

  create(){

    this.validateCategories()
    if(!this.errCategoriesName.done || !this.errCategoriesCode.done || !this.errDescription.done){
      return
    }

    this.cateService.createCategories(this.formCreateUpdate).subscribe((res:any)=>{
      if(res.status==="OK"){
        this.dialog.closeAll()
        this.toast.success(res.message)
      }else{
        this.toast.error(res.message)
      }
    })
  }

  update(){
    this.cateService.updateCategories(this.formCreateUpdate).subscribe((res:any)=>{
      if(res.status==="OK"){
        this.dialog.closeAll()
        this.toast.success(res.message)
      }else{
        this.toast.error(res.message)
      }
    })
  }
  errCategoriesName:ValidateInput =new ValidateInput();
  errCategoriesCode:ValidateInput = new ValidateInput();
  errDescription:ValidateInput = new ValidateInput();

  validateCategiesName(){
    this.errCategoriesName=CommonFunction.validateInput(this.formCreateUpdate.categoriName, 50, null);
  }

  validateCategiesCode(){
    this.errCategoriesCode=CommonFunction.validateInputUTF8Space(this.formCreateUpdate.categoriCode, 50, null,true, true);
  }

  validateCategories(){

    this.errCategoriesName=new ValidateInput();
    this.errCategoriesCode=new ValidateInput();
    this.errDescription=new ValidateInput();

    this.errCategoriesName=CommonFunction.validateInput(this.formCreateUpdate.categoriName, 50, null);
    this.errCategoriesCode=CommonFunction.validateInputUTF8Space(this.formCreateUpdate.categoriCode, 50, null,true, true);
    this.errDescription=CommonFunction.validateInput(this.formCreateUpdate.description, 1000, null);


  }
}
