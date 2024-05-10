import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../admin/Views/Pages/order-management/order.service";

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
    province_id:null,
    district_id:null,
    ward:null,
    shippingUnit:"",
    fullName:"",
    userId:null,
    note:"",
    orderDetailDTOList:new Array(OrderDetail)
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialog:MatDialog,
              private orderService:OrderService) {
    console.log(this.data)
  }
  ngOnInit(): void {
    this.orderService.getListProvince().subscribe((res:any)=>{
      this.lstProvince=res.data;
    })


  }

  create(){

  }

  changeProvince() {
    if(this.formCreateUpdate.province_id===null){
      this.lstDistict=[]
      this.lstShip=[]
      this.lstWard=[]
      this.fee=null
    }else{
      const data={
        province_id:this.formCreateUpdate.province_id
      }
      this.orderService.getListDistict(data).subscribe((res:any)=>{
        this.lstDistict=res.data;
      })
    }
  }

  changeDistict() {
    if(this.formCreateUpdate.district_id===null){
      this.lstShip=[]
      this.fee=null;
    }else{
      this.orderService.getListWard(this.formCreateUpdate.district_id).subscribe((res:any)=>{
        this.lstWard=res.data
      })

      const data={
        shop_id:5043769,
        from_district:3440,
        to_district:this.formCreateUpdate.district_id
      }

      this.orderService.getListShippingUnit(data).subscribe((res:any)=>{
        this.lstShip=res.data;
      })
    }
  }

  fee=null;
  changeWard() {
    const data={
      "service_id":this.formCreateUpdate.shippingUnit,
      "insurance_value":500000,
      "coupon": null,
      "from_district_id":3440,
      "to_district_id":this.formCreateUpdate.district_id,
      "to_ward_code":this.formCreateUpdate.ward,
      "height":15,
      "length":15,
      "weight":5000,
      "width":15
    }
    this.orderService.caculateFee(data).subscribe((res:any)=>{
      this.fee = res.data.total
    })
  }
}
export class OrderDetail{
  quantity!:number;
  productId!:number;
  typeProductId?:number;
  sizeProductId?:number;
}
