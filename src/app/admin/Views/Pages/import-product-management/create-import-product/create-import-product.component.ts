import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../../../environment/environment";
import {ProductService} from "../../product-management/product.service";
import {BrandService} from "../../brand-management/brand.service";
import {CategoriesService} from "../../categories-management/categories.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FileDetailComponent} from "../../../../../core/compontnts/file-detail/file-detail.component";
import {DatePipe} from "@angular/common";
import {ImportProductService} from "../import-product.service";

@Component({
  selector: 'app-create-import-product',
  templateUrl: './create-import-product.component.html',
  styleUrls: ['./create-import-product.component.scss']
})
export class CreateImportProductComponent implements OnInit{
  domainFile = environment.DOMAIN_FILE_SERVER;
  lstProduct:any[]=[];
  productId:any=null;
  priceBuy:any;

  constructor(private productService: ProductService,
              private brandService:BrandService,
              private categoriesService:CategoriesService,
              private toast:ToastrService,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private dialog:MatDialog,
              private datePipe: DatePipe,
              private importProductService:ImportProductService
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
    if(this.validateImportProduc()){
      this.productInfor.listProductDetail = this.listProductDetail;
      this.productInfor.priceImport=this.priceBuy;
      console.log("ProductInfor: ", this.productInfor)
      this.importProductService.importProduct(this.productInfor).subscribe((res:any)=>{
        if(res.status==="OK"){
          this.toast.success("Nhập hàng thành công")
        }else{
          this.toast.error(res.message)
        }
      })
    }
  }

  errPriceImport ="";
  errQuantityImport=""
  errProduct=""
  validateImportProduc(){

    this.errPriceImport ="";
    this.errQuantityImport=""
    this.errProduct=""

    if(!this.priceBuy){
      this.errPriceImport="Giá nhập không được để trống";
    }else if(this.priceBuy<=0){
      this.errPriceImport="Giá nhập không hợp lệ";
    }else{
      this.errPriceImport="";
    }


    let check = false;
    for(let i =0;i<this.listProductDetail.length;i++){
      if(this.listProductDetail[i].quantity<0){
        this.errQuantityImport="Số lượng nhập không hợp lệ";
      }
      if(this.listProductDetail[i].quantity>0){
        check=true;
      }
    }

    if(!check){
      this.errQuantityImport="Cần nhập số lượng cho ít nhất 1 sản phẩm";
    }

    if(this.productId==null){
      this.errProduct="Sản phẩm nhập không được để trống";
    }else{
       this.errProduct=""
    }

    return this.errQuantityImport=="" && this.errPriceImport=="" && this.errProduct==""
  }

  ngOnInit(): void {
    if(this.data?.isCreate){
      this.productService.getAllProductForCreateSale().subscribe((res:any)=>{
        if(res.status=="OK"){
          this.lstProduct = res.data;
        }
      });
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
      this.productId=this.data.itemData.id
      this.searchHistoryImport()
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
      }else{
        this.toast.error(res.message)
      }
    })
    this.formDataSend.delete("productDTO");
    this.formDataSend.delete("sizeList");
    this.formDataSend.delete("typeProductList");
    this.formDataSend.delete("file");
    this.formDataSend.delete("file");

    // this.formDataSend.append('productDTO',new Blob([ JSON.stringify(this.productInfor)],{type: 'application/json'}));
    // this.formDataSend.append('sizeList', new Blob([JSON.stringify(this.listSize)] ,{type: 'application/json'}) );
    // this.formDataSend.append('typeProductList', new Blob([JSON.stringify(this.listType)] ,{type: 'application/json'}) );
    console.log("Form data send: ", this.formDataSend)
    console.log("ProductInfor: ", this.productInfor)
    console.log("Size: ", this.listSize)
    console.log("Type: ", this.listType)

  }
  lstHistoryImport:any;

  changeProduct() {
    this.productService.getDetailProduct(this.productId).subscribe((res:any)=>{
      console.log(res)
      this.productInfor = res.data;
      this.listSize = res.data.sizeDTOS;
      this.listType = res.data.typeProductDTOS;
      this.listProductDetail = res.data.typeSizeDTOS.map((item:any)=>{
        item.quantity=0;
        return item;
      })
      this.listPathImg = res.data.lstProductIMG
      this.lstUrlImgUpdate = res.data.pathImg
    })
    this.searchHistoryImport();
  }

  searchHistoryImport(){
    this.productService.getHistoryImportProduct(this.productId).subscribe((res:any)=>{
      this.lstHistoryImport=res.data.map((item:any)=>{

        const date = new Date(item.importDate*1000)

        item.importDate= this.datePipe.transform(date, 'dd/MM/yyyy');

        return item;
      });
    })
  }

  viewFile(index: number) {
    const data = { lstFile: this.lstUrlImgUpdate, index: index };
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
