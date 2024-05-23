import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {SaleManagementComponent} from "../sale-management.component";
import {ProductService} from "../../product-management/product.service";
import {NO_ROW_GRID_TEMPLATE} from "../../../../../../helpers/constants";
import {
  ActionRoleManagementComponent
} from "../../role-management/action-role-management/action-role-management.component";
import {ActionProductComponent} from "../../product-management/action-product/action-product.component";
import {SaleService} from "../sale.service";
import {ToastrService} from "ngx-toastr";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";
import {parseIsoWeekday} from "ngx-bootstrap/chronos/units/day-of-week";

@Component({
  selector: 'app-create-update-sale',
  templateUrl: './create-update-sale.component.html',
  styleUrls: ['./create-update-sale.component.scss']
})
export class CreateUpdateSaleComponent implements OnInit{

  saleFor = [
    {
      id:0,
      name: 'Sản phẩm',
    },{
      id:1,
      name:'Hóa đơn'
    }
  ]

  body = {
    code:"",
    name:"",
    description:"",
    status:1,
    title:"",
    type:0,
    quantity:0,
    minPrice:0,
    maxPrice:null,
    maxPurchase:0,
    maxDiscount:0,
    productIdLst:[],
    startTime:"" ,
    endTime:""
  };
  startDateStr="";
  endDateStr="";

  listStatus2 = [
    {
      id: 0,
      name: this.translate.instant('ZOOM_CONFIG.LIST_STATUS1.INACTIVE'),
      color: '#D14343'
    },
    {
      id: 1,
      name: this.translate.instant('ZOOM_CONFIG.LIST_STATUS1.ACTIVE'),
      color: '#52BD94'
    }
  ]
  constructor(public dialogRef: MatDialogRef<CreateUpdateSaleComponent>,
              private translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService:ProductService,
              private saleService: SaleService,
              private toast:ToastrService,) { }

  ngOnInit(): void {
    console.log(this.startDateStr)
    this.searchProduct();
  }
  rowData:any;
  currentPage=1;
  totalPage=0;
  totalElement=0;
  rowDataDisPlay:any;
  searchProduct(){
    if(this.data.isCreate){
      this.productService.getAllProductForCreateSale().subscribe((res:any)=>{
        this.rowData=res.data.map((item:any)=>{
          item.selected = false;
          item.priceSale=item.price;
          return item
        });
        this.rowDataDisPlay= this.rowData.slice((this.currentPage-1)*10,10)
        this.totalElement=this.rowData.length;
        this.totalPage = Math.ceil(this.totalElement/10);
        console.log(this.rowDataDisPlay)
      })
    }else{
      this.saleService.detailSale(this.data?.itemData?.code).subscribe((res:any)=>{
        const type =res.data.type
        this.body=res.data
        this.body.type=parseInt(type)
        this.rowData=res.data?.productDTOList
        this.rowDataDisPlay= this.rowData.slice((this.currentPage-1)*10,10)
        this.totalElement=this.rowData.length;
        this.totalPage = Math.ceil(this.totalElement/10);
        console.log(this.rowDataDisPlay)
        this.startDateStr = this.formatDate(new Date(res.data.startTime*1000))
        this.endDateStr = this.formatDate(new Date(res.data.endTime*1000))
        this.body.endTime = this.endDateStr.toString()+"T00:00:00Z";
        this.body.startTime=this.startDateStr.toString()+"T00:00:00Z";
      })
    }

  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  closeModal(){
    this.dialogRef.close({event: 'cancel'});
  }

  callInforReview(param:any, event: number) {
    if(event===this.totalPage){
      this.rowDataDisPlay = this.rowData.slice((event-1)*10,this.rowData.length)
    }else{
      this.rowDataDisPlay = this.rowData.slice((event-1)*10,(event-1)*10+10)
    }
  }
  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }

  noRowsTemplate = NO_ROW_GRID_TEMPLATE;
  columdef: any= [{
    headerName: 'STT',
    valueGetter: (param:any) => {
      return (param.node.rowIndex + 1)
    },
    width: 100,
    pinned: 'left',
  },{
    headerName: "Mã sản phẩm",
    field: "productCode",
  },{
    headerName: "Tên sản phẩm",
    field: "productName",
  },{
    headerName: "Số lượng",
    field: "quantity",
  },{
    headerName: "Giá",
    field: "price",
  }
  ];
  allComplete=false;

  someComplete() {
    if (this.rowData == null) {
      return false;
    }
    return this.rowData.filter((t:any) => t.selected).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.rowData == null) {
      return;
    }
    this.rowData.forEach((t:any) => (t.selected = completed));
  }
  updateAllComplete() {
    this.allComplete = this.rowData.every((t:any) => t.selected);
  }

  changePriceDiscount() {
    if(this.body.maxPurchase !== null){
      this.rowData=this.rowData.map((item:any)=>{
        item.priceSale = item.price * ((100 - this.body.maxPurchase!)/100)
        return item;
      })
    }
  }

  createSale() {
    if(this.body.type===0){
      this.body.productIdLst = this.rowData.map((item:any)=>{
        if(item.selected){
          return item.id
        }else{
          return null;
        }
      }).filter((item:any)=> item!==null)
    }
    if(this.validateCreateSale()){
      if(this.body.startTime!=="" && this.body.endTime!==""){
        if(this.data.isCreate){
          this.saleService.createSale(this.body).subscribe((res:any)=>{
            if(res.status==='OK'){
              this.toast.success("Thêm mới thành công")
              // this.saleComponent.search()
              this.closeModal()
            }else{
              this.toast.error(res.message)
            }
          }, (err:any)=>{this.toast.error("Lỗi trong quá trình xử lý")})
        }else{
          this.saleService.updateSale(this.body).subscribe((res:any)=>{
            if(res.status==='OK'){
              this.toast.success("Cập nhật thành công")
              // this.saleComponent.search()
              this.closeModal()
            }else{
              this.toast.error(res.message)
            }
          })
        }
      }
    }
  }

  updateSale(){
    this.createSale();
  }

  errCode="";
  errName = "";
  errMaxPurchase="";
  errStartTime="";
  errEndTime="";
  errQuantitySale="";
  errSaleProduct="";

  validateCreateSale(){
    this.errCode="";
    this.errName = "";
    this.errMaxPurchase="";
    this.errStartTime="";
    this.errEndTime="";
    this.errQuantitySale="";
    this.errSaleProduct="";
    // validate code
    if(this.body.code.trim() === '' ){
      this.errCode = "Mã giảm giá không được để trống";
    }else if(this.body.code.length <=6){
      this.errCode = "Mã giảm giá không ngắn hơn 6 kí tự"
    }else{
      this.errCode="";
    }

    // validate name
    if(this.body.name.trim()===""){
      this.errName="Tên mã giảm giá không được để trống"
    }else {
      this.errName="";
    }

    if(this.body.maxPurchase<=0 || this.body.maxPurchase>100){
      this.errMaxPurchase="Phần trăm khuyến mãi không đúng"
    }else{
      this.errMaxPurchase="";
    }

    if(this.body.type==1){
      if(this.body.quantity<=0 ){
        this.errQuantitySale="Số lượng phiếu giảm giá không được để trống";
      }
    }

    if(this.body.type ==0){
      let check=true;
      this.body.productIdLst.forEach((item:any)=>{
        if(item.selected){}
        check=false;
      })
      if(check){
        this.errSaleProduct="Cần chọn ít nhất một sản phẩm cho mã giảm giá";
      }else{
        this.errSaleProduct="";
      }
    }


    if(this.body.startTime.trim()===""){
      this.errStartTime="Ngày bắt đầu khuyến mãi không được để trống"
    }else if(this.body.endTime.trim()===""){
      this.errEndTime="Ngày kết thúc khuyến mãi không được để trống";
    }else if(this.startDateStr >= this.endDateStr){
      this.errStartTime = "Ngày bắt đầu không thể bằng hoặc lớn hơn ngày khuyến mãi";
    }else{
      this.errStartTime ="";
      this.errEndTime="";
    }
    return (this.errCode=="" && this.errStartTime=="" && this.errName=="" && this.errEndTime=="" && this.errSaleProduct=="")
  }

  changeStartTime(event:any) {
    this.body.startTime=this.startDateStr.toString()+"T00:00:00Z";
  }

  changeEndTime(event:any) {
    this.body.endTime = this.endDateStr.toString()+"T00:00:00Z";
    // this.body.endTime = new Date(event.value)
  }
}
