import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {BrandService} from "../../brand-management/brand.service";

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent implements OnInit{

  constructor(private productService: ProductService, private brandService:BrandService) {
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
    this.listSize.push(sizeAdd);
  }
  removeSize(size:any){
    this.listSize = this.listSize.filter((item:any)=>
      item.position != size.position
    )
    this.listSize.forEach((item: any,index :number)=> item.position=index+1)
  }

  addType(){
    const sizeAdd:typeProduct={
      typeName: "",
      description: "",
      position: this.listType.length+1
    }
    this.listType.push(sizeAdd);
  }
  removeType(type: any){
    this.listType = this.listType.filter((item:any)=>
      item.position != type.position
    )
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
    if(event.index===3){
      this.listProductDetail=[]
      for(let i = 0; i< this.listSize.length;i++){
        for(let j =0; j<this.listType.length;j++){
          const productDetail = {
            quantity: 0,
            positionSize: this.listSize[i].position,
            sizeName: this.listSize[i].sizeName,
            positionType: this.listType[j].position,
            typeName: this.listType[j].typeName
          }
          this.listProductDetail.push(productDetail);
        }
      }
      console.log("Product detail: ", this.listProductDetail)
    }
    // console.log(event)
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

      }
    })

  }

  ngOnInit(): void {
    this.brandService.getListBrand().subscribe((data:any)=>{
      this.listBrand=data.map((item:any)=>{
        return {
          id: item.id,
          nameTranform: item.brandCode + " - "+ item.brandName
        }
      });
    })
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
