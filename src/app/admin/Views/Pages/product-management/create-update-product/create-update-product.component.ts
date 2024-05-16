import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {BrandService} from "../../brand-management/brand.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategoriesService} from "../../categories-management/categories.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent implements OnInit{

  constructor(private productService: ProductService,
              private brandService:BrandService,
              private categoriesService:CategoriesService,
              private toast:ToastrService,
              @Inject(MAT_DIALOG_DATA) public data:any
  ) {
  }
  productInfor:any={
    description:"",
    price:null,
    productName:null,
    productCode:null,
    categoriesID:null,
    brandId:null,
  }

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
      }
      this.listProductDetail.push(productDetail);
    })
  }
  removeSize(size:any){
    this.listSize = this.listSize.filter((item:any)=>
      item.position != size.position
    )
    this.listProductDetail.filter((item:any)=>{
      item.positionSize != size.position
    })
    this.listSize.forEach((item: any,index :number)=> item.position=index+1)

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
        typeName: this.listType[indexType-1].typeName
      }
      this.listProductDetail.push(productDetail);
    })
  }
  removeType(type: any){
    this.listType = this.listType.filter((item:any)=>
      item.position != type.position
    )
    this.listProductDetail.filter((item:any)=>{
      item.positionType != type.position
    })
    this.listType.forEach((item: any,index :number)=> item.position=index+1)
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
  removeImgProduct(urlImg: any, index:any){
    this.imageUrls = this.imageUrls.filter((item:any)=> item!=urlImg);
    if(index>=0 && index < this.lstFileProduct.length){
      const filesArray: File[] = Array.from(this.lstFileProduct);
      filesArray.splice(index, 1);
      this.lstFileProduct=filesArray;
      console.log(this.lstFileProduct)
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
      }else{
        this.toast.error(data.message);
      }
    })
    this.formDataSend.delete("productDTO");
    this.formDataSend.delete("sizeList");
    this.formDataSend.delete("typeProductList");
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
        this.imageUrls=res.data.pathImg;
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
