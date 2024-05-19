import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../admin/Views/Pages/order-management/order.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit{
  priceOfOrder=0;
  totalPay=0

  lstProvince= [];
  lstDistict= [];
  lstWard= [];
  lstShip=[];
  lstSaleBill=[];
  lstPayMent=[
    {
      id:1,
      name:'Thanh toán Online'
    },{
      id:2,
      name:'Thanh toán khi nhận hàng'
    }
  ]

  formCreateUpdate={
    paymentMethod:1,
    phoneNumber:"",
    provinceId:null,
    districtId:null,
    ward:null,
    shippingUnit:null,
    fullName:"",
    userId:null,
    note:"",
    saleId:null,
    shipPrice:0,
    orderDetailDTOList:new Array(OrderDetail)
  }

  currentUser :any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialog:MatDialog,
              private orderService:OrderService,
              private toast:ToastrService,
              private router:Router) {

    const user= localStorage.getItem('user')
    if(user){
      this.currentUser = JSON.parse(user)
    }

    this.data.forEach((item:any)=>{
      if(item.maxPurchase){
        this.priceOfOrder+=(item.quantity*(item.price*((100-item.maxPurchase)/100)));
      }else{
        this.priceOfOrder+=(item.quantity*item.price);
      }
    })
    this.totalPay=this.priceOfOrder
    console.log(this.data)
  }
  ngOnInit(): void {
    this.orderService.getListProvince().subscribe((res:any)=>{
      this.lstProvince=res.data;
    })
    this.orderService.searchSaleForBill().subscribe((res:any)=>{
      this.lstSaleBill = res.data.map((item:any)=>{
        item.nameTranform = "- "+item.maxPurchase+ "%    "+item.name;
        return item;
      });
    })

  }

  create(){
    if(this.validate()){
      const listProduct = this.data.map((item:any)=>{
        const inforProduct={
          quantity: item.quantity,
          productId: item.productId,
          typeProductId:item.typeProductId,
          sizeProductId: item.sizeProductId
        }
        return inforProduct
      })

      this.formCreateUpdate.userId = this.currentUser.id;
      this.formCreateUpdate.orderDetailDTOList=listProduct;
      this.formCreateUpdate.shipPrice=this.fee
      console.log(this.formCreateUpdate)
      this.orderService.createOrder(this.formCreateUpdate).subscribe((res:any)=>{
        if(res.status=='OK'){
          if(this.formCreateUpdate.paymentMethod==1){
            const orderCode = res.data.orderCode;
            this.orderService.getLinkPayMent(this.totalPay*100, orderCode).subscribe((res:any)=>{
              if(res.status =='Ok'){
                const anchor = document.createElement('a');
                anchor.href = res.url;
                anchor.target='_blank'
                anchor.click()
              }
            })
          }else{
            this.toast.success("Đặt hàng thành công")
          }

        }else{
          this.toast.error(res.message)
        }
      },(err:any)=>{this.toast.error(err.message)})


      // if(this.formCreateUpdate.paymentMethod==2){
      //   this.formCreateUpdate.userId = this.currentUser.id;
      //   this.formCreateUpdate.orderDetailDTOList=listProduct;
      //   this.formCreateUpdate.shipPrice=this.fee
      //   console.log(this.formCreateUpdate)
      //   this.orderService.createOrder(this.formCreateUpdate).subscribe((res:any)=>{
      //     if(res.status=='OK'){
      //       this.toast.success("Đặt hàng thành công")
      //     }else{
      //       this.toast.error(res.message)
      //     }
      //   },(err:any)=>{this.toast.error(err.message)})
      // }else{
      //   this.orderService.getLinkPayMent(this.totalPay*100).subscribe((res:any)=>{
      //     if(res.status =='Ok'){
      //       const anchor = document.createElement('a');
      //       anchor.href = res.url;
      //       anchor.target='_blank'
      //       anchor.click()
      //     }
      //   })
      // }
    }else{

    }
  }
  errFullName=""
  errSDT="";
  errProvince="";
  errDistict="";
  errWard="";
  errShipping="";
  validate(){
    if(this.formCreateUpdate.fullName.trim()==""){
      this.errFullName ="Họ tên người nhận không được để trống";
    }else{
      this.errFullName=""
    }

    if(this.formCreateUpdate.phoneNumber.trim()==""){
      this.errSDT ="Số điện thoại người nhận không được để trống";
    }else{
      this.errSDT="";
    }

    if(this.formCreateUpdate.provinceId==null){
      this.errProvince="Vui lòng chọn địa chỉ nhận"
    }else{
      this.errProvince=""
    }
    if(this.formCreateUpdate.districtId==null){
      this.errDistict="Vui lòng chọn địa chỉ nhận"
    }else{
      this.errDistict=""
    }
    if(this.formCreateUpdate.ward==null){
      this.errWard="Vui lòng chọn địa chỉ nhận"
    }else{
      this.errWard=""
    }
    if(this.formCreateUpdate.shippingUnit==null){
      this.errShipping="Vui lòng chọn phương thức vận chuyển";
    }

    return this.errShipping=="" && this.errWard=="" && this.errProvince=="" && this.errSDT=="" && this.errFullName=="" && this.errDistict==""

  }

  changeProvince() {
    if(this.formCreateUpdate.provinceId===null){
      this.lstDistict=[]
      this.lstShip=[]
      this.lstWard=[]
      this.formCreateUpdate.districtId=null;
      this.formCreateUpdate.shippingUnit=null;
      this.formCreateUpdate.ward=null;
      this.fee=0
    }else{
      const data={
        province_id:this.formCreateUpdate.provinceId
      }
      this.orderService.getListDistict(data).subscribe((res:any)=>{
        this.lstDistict=res.data;
      })
      this.lstShip=[]
      this.lstWard=[]
      this.formCreateUpdate.districtId=null;
      this.formCreateUpdate.shippingUnit=null;
      this.formCreateUpdate.ward=null;
      this.fee=0
    }
  }

  changeDistict() {
    if(this.formCreateUpdate.districtId===null){
      this.lstShip=[]
      this.lstWard=[]
      this.formCreateUpdate.ward=null;
      this.fee=0;
      this.formCreateUpdate.shippingUnit=null;
      this.errDistict="Vui lòng chọn quận, huyện giao hàng"
    }else{
      this.errDistict=""
      this.lstShip=[]
      this.lstWard=[]
      this.formCreateUpdate.ward=null;
      this.fee=0;
      this.formCreateUpdate.shippingUnit=null;
      this.orderService.getListWard(this.formCreateUpdate.districtId).subscribe((res:any)=>{
        this.lstWard=res.data
      })

      const data={
        shop_id:5043769,
        from_district:3440,
        to_district:this.formCreateUpdate.districtId
      }

      this.orderService.getListShippingUnit(data).subscribe((res:any)=>{
        this.lstShip=res.data;
      })
    }
  }

  fee=0;
  changeWard() {

  }

  changeShipping() {
    const data={
      "service_id":this.formCreateUpdate.shippingUnit,
      "insurance_value":this.priceOfOrder,
      "coupon": null,
      "from_district_id":3440,
      "to_district_id":this.formCreateUpdate.districtId,
      "to_ward_code":this.formCreateUpdate.ward,
      "height":15,
      "length":15,
      "weight":5000,
      "width":15
    }
    this.orderService.caculateFee(data).subscribe((res:any)=>{
      if(res.code==200){
        this.fee = res.data.total
        if(this.sale){
          this.totalPay=(this.priceOfOrder* (100-this.sale?.maxPurchase)/100)+res.data.total;
        }else{
          this.totalPay = this.priceOfOrder+res.data.total;
        }
        this.errShipping="";
      }else{
        this.fee=0;
        this.totalPay=this.priceOfOrder
        this.toast.warning(res.message)
      }
    }, (error:any) =>{
      this.fee=0;
      this.totalPay=this.priceOfOrder
      this.toast.warning(error?.error?.code_message_value)
      this.errShipping="Đơn vị vận chuyển không hợp lệ"
    } )
  }

  sale:any
  changeSale() {
    if(this.formCreateUpdate.saleId){
      this.lstSaleBill.forEach((item:any) => {
        if(this.formCreateUpdate.saleId==item.id){
          this.sale =  item;
        }
      } )
      this.totalPay = (this.priceOfOrder* (100-this.sale?.maxPurchase)/100)+this.fee
    }else{
      this.totalPay = this.priceOfOrder+ this.fee
    }
  }
}
export class OrderDetail{
  quantity!:number;
  productId!:number;
  typeProductId?:number;
  sizeProductId?:number;
}
