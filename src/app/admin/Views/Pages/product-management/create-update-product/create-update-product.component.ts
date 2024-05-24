import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {BrandService} from "../../brand-management/brand.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CategoriesService} from "../../categories-management/categories.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../../../environment/environment";
import {ValidateInput} from "../../../../../../core/service/model/validate-input.model";
import {CommonFunction} from "../../../../../../core/service/utils/common-function";
import {FileDetailComponent} from "../../../../../core/compontnts/file-detail/file-detail.component";

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent implements OnInit{
  domainFile = environment.DOMAIN_FILE_SERVER;

  constructor(private productService: ProductService,
              private brandService:BrandService,
              private categoriesService:CategoriesService,
              private toast:ToastrService,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private dialog:MatDialog
  ) {
  }
  listPathImg:any // chứa danh sách các product_img
  lstUrlImgUpdate:any;
  productInfor:any={
    description:"",
    price:null,
    productName:null,
    productCode:null,
    categoriesID:null,
    brandId:null,
  }
  errDescription:ValidateInput=new ValidateInput();
  errPrice:ValidateInput=new ValidateInput();
  errProductName:ValidateInput=new ValidateInput();
  errProductCode:ValidateInput=new ValidateInput();
  errCategoriesId:ValidateInput=new ValidateInput();
  errBrandId:ValidateInput=new ValidateInput();


  listBrand:any;
  listCategories:any[]=[];
  formDataSend = new FormData();
  listProductDetail:any[]=[];
  listSize:sizeProduct[]=[
    {
      sizeName: "",
      description: "",
      position: 1
    }
  ];
  listType:typeProduct[]=[
    {
      typeName:"",
      description: "",
      position:1
    }
  ];

  addSize(){
    const sizeAdd:sizeProduct={
      sizeName: "",
      description: "",
      position: this.listSize.length+1
    }
    const indexSize=sizeAdd.position;
    this.listSize.push(sizeAdd);
    this.listType.forEach((item:any)=>{
      const productDetail ={
        quantity: 0,
        positionSize: this.listSize[indexSize-1].position,
        sizeName: this.listSize[indexSize-1].sizeName,
        positionType: item.position,
        typeName:item.typeName ,
        typeId:item.id
      }
      this.listProductDetail.push(productDetail);
    })
  }
  removeSize(size:any){

    if(size.id){
      for(let item of this.listProductDetail){
        if(item.quantity>0 && size.id == item.sizeId){
          this.toast.warning("Kích cỡ này trong kho đang còn só lượng, không được xóa");
          return;
        }
      }
      this.listSize = this.listSize.filter((item:any)=> {
          return item.position != size.position
        }
      )
      this.listProductDetail=this.listProductDetail.filter((item:any)=>{
        return item.positionSize != size.position
      })
      this.listSize.forEach((item: any,index :number)=> item.position=index+1)
    }else{
      this.listSize = this.listSize.filter((item:any)=> {
          return item.position != size.position
        }
      )
      this.listProductDetail=this.listProductDetail.filter((item:any)=>{
        return item.positionSize != size.position
      })
      this.listSize.forEach((item: any,index :number)=> item.position=index+1)
    }
  }

  addType(){
    const typeAdd:typeProduct={
      typeName: "",
      description: "",
      position: this.listType.length+1
    }
    const indexType=typeAdd.position;
    this.listType.push(typeAdd);
    this.listSize.forEach((item:any)=>{
      const productDetail ={
        quantity: 0,
        positionSize: item.position,
        sizeName: item.sizeName,
        positionType: this.listType[indexType-1].position,
        typeName: this.listType[indexType-1].typeName,
        sizeId:item.id
      }
      this.listProductDetail.push(productDetail);
    })
  }
  removeType(type: any){

    if(type.id){
      for(let item of this.listProductDetail){
        if(item.quantity>0 && type.id == item.typeId){
          this.toast.warning("Loại này trong kho đang còn só lượng, không được xóa");
          return;
        }
      }
      this.listType = this.listType.filter((item:any)=>
        {
          return item.position != type.position
        }
      )
      this.listProductDetail = this.listProductDetail.filter((item:any)=>{
        {
          return item.positionType != type.position;
        }
      })
      this.listType.forEach((item: any,index :number)=> item.position=index+1)
    }else{
      this.listType = this.listType.filter((item:any)=>
        {
          return item.position != type.position
        }
      )
      this.listProductDetail = this.listProductDetail.filter((item:any)=>{
        {
          return item.positionType != type.position;
        }
      })
      this.listType.forEach((item: any,index :number)=> item.position=index+1)
    }
  }

  imageUrls: string[] = [];
  lstFileProduct: any[]=[];
  onFileSelected(event: any) {
    const files = event.target.files;
    this.lstFileProduct = files;
    console.log("File upload: ", this.lstFileProduct)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
  productImgDelete:any[]=[]
  removeImgProduct(urlImg: any, index:any, isUpdate:boolean){
    if(isUpdate){


      if(this.listPathImg){
        this.lstUrlImgUpdate = this.lstUrlImgUpdate.filter((item:any)=> item!=urlImg);
        for(let item of this.listPathImg){
          if(item.fileName === urlImg){
            this.productImgDelete.push(item.id);
          }
        }
      }
    }else{
      this.imageUrls = this.imageUrls.filter((item:any)=> item!=urlImg);
      if(index>=0 && index < this.lstFileProduct.length){
        const filesArray: File[] = Array.from(this.lstFileProduct);
        filesArray.splice(index, 1);
        this.lstFileProduct=filesArray;
        console.log(this.lstFileProduct)
      }
    }
  }
  changeTab(event:any){
    if(event.index===3 && this.data?.isCreate){
      const listProductDetailChange=[]
      for(let i = 0; i< this.listSize.length;i++){
        for(let j =0; j<this.listType.length;j++){
          const productDetail = {
            quantity: 0,
            positionSize: this.listSize[i].position,
            sizeName: this.listSize[i].sizeName,
            positionType: this.listType[j].position,
            typeName: this.listType[j].typeName
          }
          listProductDetailChange.push(productDetail);
        }
      }
      console.log("Product detail: ", this.listProductDetail)
    }

    console.log(event)
  }
  submit(){

    this.validateProduct()
    if(!this.errPrice.done || this.errDescription?.maxLength || !this.errBrandId.done|| !this.errCategoriesId.done|| !this.errProductCode.done|| !this.errProductName.done || this.validateLstSize()||this.validateLstType()){
      return
    }

    if(this.lstFileProduct){
      this.lstFileProduct=Array.from(this.lstFileProduct);
      this.lstFileProduct.forEach((item:any)=>{
        this.formDataSend.append('file',  item);
      })
    }
    this.productInfor.listProductDetail = this.listProductDetail;

    this.formDataSend.append('productDTO',new Blob([ JSON.stringify(this.productInfor)],{type: 'application/json'}));
    this.formDataSend.append('sizeList', new Blob([JSON.stringify(this.listSize)] ,{type: 'application/json'}) );
    this.formDataSend.append('typeProductList', new Blob([JSON.stringify(this.listType)] ,{type: 'application/json'}) );
    console.log("Form data send: ", this.formDataSend)
    console.log("ProductInfor: ", this.productInfor)
    console.log("Size: ", this.listSize)
    console.log("Type: ", this.listType)
    this.productService.saveProduct(this.formDataSend).subscribe((data:any)=>{
      if(data.status==='OK'){
        this.toast.success("Thêm mới sản phẩm thành công")
        this.dialog.closeAll();
      }else{
        this.toast.error(data.message);
      }
    })
    this.formDataSend.delete("productDTO");
    this.formDataSend.delete("sizeList");
    this.formDataSend.delete("typeProductList");
    this.formDataSend.delete("file");
  }

  ngOnInit(): void {
    if(this.data?.isCreate){
      const productDetail = {
        quantity: 0,
        positionSize: this.listSize[0].position,
        sizeName: this.listSize[0].sizeName,
        positionType: this.listType[0].position,
        typeName: this.listType[0].typeName
      }
      this.listProductDetail[0]={
        quantity: 0,
        positionSize: this.listSize[0].position,
        sizeName: this.listSize[0].sizeName,
        positionType: this.listType[0].position,
        typeName: this.listType[0].typeName
      }
      console.log("crea detail: ", this.listProductDetail)
    }else{
      this.productService.getDetailProduct(this.data.itemData.id).subscribe((res:any)=>{
        console.log(res)
        this.productInfor = res.data;
        this.listSize = res.data.sizeDTOS;
        this.listType = res.data.typeProductDTOS;
        this.listProductDetail = res.data.typeSizeDTOS
        this.listPathImg = res.data.lstProductIMG
        this.lstUrlImgUpdate = res.data.pathImg
      })
    }
    this.brandService.getListBrand().subscribe((data:any)=>{
      this.listBrand=data.map((item:any)=>{
        return {
          id: item.id,
          nameTranform: item.brandCode + " - "+ item.brandName
        }
      });
    })
    this.categoriesService.getNoTree().subscribe((res:any)=>{
      if(res.status==='OK'){
        this.listCategories=res.data;
      }else{
        this.toast.error(res.message);
      }
    })


  }

  updateProduct() {
    this.productInfor.listProductDetail = this.listProductDetail;
    this.productInfor.imgDelete = this.productImgDelete
    if(this.lstFileProduct){
      this.lstFileProduct=Array.from(this.lstFileProduct);
      this.lstFileProduct.forEach((item:any)=>{
        this.formDataSend.append('file',  item);
      })
    }
    this.formDataSend.append('productDTO',new Blob([ JSON.stringify(this.productInfor)],{type: 'application/json'}));
    this.formDataSend.append('sizeList', new Blob([JSON.stringify(this.listSize)] ,{type: 'application/json'}) );
    this.formDataSend.append('typeProductList', new Blob([JSON.stringify(this.listType)] ,{type: 'application/json'}) );
    this.productService.updateProduct(this.formDataSend).subscribe((res:any)=>{
      if(res.status==="OK"){
        this.toast.success(res.message)
        this.dialog.closeAll();
      }else{
        this.toast.error(res.message)
      }
    })
    this.formDataSend.delete("productDTO");
    this.formDataSend.delete("sizeList");
    this.formDataSend.delete("typeProductList");
    this.formDataSend.delete("file");

    // this.formDataSend.append('productDTO',new Blob([ JSON.stringify(this.productInfor)],{type: 'application/json'}));
    // this.formDataSend.append('sizeList', new Blob([JSON.stringify(this.listSize)] ,{type: 'application/json'}) );
    // this.formDataSend.append('typeProductList', new Blob([JSON.stringify(this.listType)] ,{type: 'application/json'}) );
    console.log("Form data send: ", this.formDataSend)
    console.log("ProductInfor: ", this.productInfor)
    console.log("Size: ", this.listSize)
    console.log("Type: ", this.listType)

  }
  validateProduct(){
    this.errDescription=new ValidateInput();
    this.errPrice=new ValidateInput();
    this.errProductName=new ValidateInput();
    this.errProductCode=new ValidateInput();
    this.errCategoriesId=new ValidateInput();
    this.errBrandId=new ValidateInput();

    this.errProductCode = CommonFunction.validateInputUTF8Space(this.productInfor.productCode,50,null, null,true)
    this.errProductName = CommonFunction.validateInput(this.productInfor.productName,50,null)
    this.errCategoriesId = CommonFunction.validateInput(this.productInfor.categoriesID, null,null)
    this.errBrandId = CommonFunction.validateInput(this.productInfor.brandId, null,null)
    this.errDescription = CommonFunction.validateInput(this.productInfor.description, 1000,null)
    this.errPrice = CommonFunction.validateInput(this.productInfor.price, null,null)

  }

  errSize="";
  errType="";
  validateLstSize(){
    for (let i=0;i<this.listSize.length;i++){
      if(this.listSize[i].sizeName.trim()==''){
        this.errSize="Tên kích cỡ sản phẩm không được để trống"
        return true;
      }
    }
    this.errSize=""
    return false;
  }
  validateLstType(){
    for (let i=0;i<this.listType.length;i++){
      if(this.listType[i].typeName.trim()==''){
        this.errType="Tên loại sản phẩm không được để trống"
        return true;
      }
    }
    this.errType=""
    return false;
  }

  validateProductCode() {
    this.errProductCode = CommonFunction.validateInputUTF8Space(this.productInfor.productCode,50,null, true,true)
  }

  validateProductName() {
    this.errProductName = CommonFunction.validateInput(this.productInfor.productName,50,null)
  }


  validateCategories() {
    this.errCategoriesId = CommonFunction.validateInput(this.productInfor.categoriesID, null,null)
  }

  validateBrand() {
    this.errBrandId = CommonFunction.validateInput(this.productInfor.brandId, null,null)
  }

  validateDescription() {
    this.errDescription = CommonFunction.validateInput(this.productInfor.description, 1000,null)
  }

  validatePrice() {
    this.errPrice = CommonFunction.validateInput(this.productInfor.price, null,null)
  }

  lstAllUrlExpand:any[]=[]
  expandImg(index:number,isFileSerVer:boolean) {
    this.lstAllUrlExpand=[]
    if(this.lstUrlImgUpdate.length>0){
      this.lstAllUrlExpand = this.lstUrlImgUpdate.map((item:any)=>{
        return this.domainFile + item;
      })
    }
    if(this.imageUrls.length>0){
      this.lstAllUrlExpand=[...this.lstAllUrlExpand,...this.imageUrls]
    }

    let indexFile = 0
    if(isFileSerVer){
      indexFile = index
    }else{
      indexFile = this.lstUrlImgUpdate.length + indexFile+1;
    }


    const data = { lstFile: this.lstAllUrlExpand, index: indexFile };

    this.dialog.open(FileDetailComponent, {
      data,
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'overflow-hidden-cus',
      width: '860px',
      height: '860px',
      maxWidth: '90vw',
      maxHeight: '90vh',
    }).afterClosed()
  }
}
interface sizeProduct{
  sizeName: "",
  description: "",
  position: number
}
interface typeProduct{
  typeName:"",
  description: "",
  position:number
}
