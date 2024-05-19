import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {OrderService} from "../order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  inforOrder:any;
  orderDetail:any;
  statusCurrent=5;
  itemStatus=[
    {
      name: "Chờ xác nhận",
      code: 0,
      color: "blue"
    },
    {
      name: "Xác nhận",
      code:1,
      color: "orange",
    },
    {
      name: "Giao hàng",
      code:2,
      color: "blue",
    },
    {
      name: "Hoàn thành",
      code:3,
      color: "green",
    },
    {
      name: "Hoàn hủy",
      code:4,
      color: "red",
    }
  ];

  nameProvince=""
  nameDistict=""
  nameWard=""
  nameShippingUnit=""
  namePayMent=""
  payStatus=""

  lstPayMent=[
    {
      id:1,
      name:'Đã thanh toán'
    },{
      id:0,
      name:'Chưa thanh toán'
    }
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialog:MatDialog,
              public orderService:OrderService,
              private toast:ToastrService,
              private changeDetef:ChangeDetectorRef
              ) {
  }
  ngOnInit(): void {
    this.orderService.detailOrder(this.data.id).subscribe((res:any)=>{
      if(res.status=='OK'){
        this.inforOrder = res.data;
        this.orderDetail=res.data?.orderDetailForCartDTOS


        this.statusCurrent=this.inforOrder.status;// lấy thông tin trạng thái hiện tại của đơn hàng

        if(this.inforOrder.paymentMethod==1){
          this.namePayMent="Thanh toán online"
        }else{
          this.namePayMent="Thanh toán khi nhận hàng"
        }

        // if(this.inforOrder.payStatus==1){
        //   this.payStatus="Đã thanh toán"
        // }else{
        //   this.payStatus="Chưa thanh toán"
        // }

        this.searchAddress()
      }
      console.log(res)
      this.changeDetef.detectChanges();
    })

  }

  searchAddress(){

    this.orderService.getListProvince().subscribe((res:any)=>{
      res.data.forEach((item:any)=>{
        if(item.ProvinceID == this.inforOrder.provinceId){
          this.nameProvince = item.ProvinceName;
        }
      })
    })

    const data={
      province_id:this.inforOrder.provinceId
    }
    this.orderService.getListDistict(data).subscribe((res:any)=>{
      res.data.forEach((item:any)=>{
        if(item.DistrictID == this.inforOrder.districtId){
          this.nameDistict = item.DistrictName;
        }
      });
    })

    this.orderService.getListWard(this.inforOrder.districtId).subscribe((res:any)=>{
      res.data.forEach((item:any)=>{
        if(item.WardCode == this.inforOrder.ward){
          this.nameWard = item.WardName;
        }
      });
    })

    const data2={
      shop_id:5043769,
      from_district:3440,
      to_district:this.inforOrder.districtId
    }

    this.orderService.getListShippingUnit(data2).subscribe((res:any)=>{
      res.data.forEach((item:any)=>{
        if(item.service_id == this.inforOrder.shippingUnit){
          this.nameShippingUnit = item.short_name;
        }
      });
    })

  }

  update() {
    console.log(this.inforOrder)
    this.orderService.updateOrder(this.inforOrder).subscribe((res:any)=>{
      if(res.status=='OK'){
        this.toast.success("Cập nhật đơn hàng thành công")
        this.dialog.closeAll()
      }else {
        this.toast.error(res.message)
      }
    })
  }

  changeTab(event: any) {

  }

  changeStatus() {
    if(this.statusCurrent==0 && (this.inforOrder.status !==1 && this.inforOrder.status !==this.statusCurrent)){
      this.toast.warning("Cần phải xác nhận đơn hàng trước")
      setTimeout((data:any)=>{this.inforOrder.status=this.statusCurrent},100)
      this.changeDetef.detectChanges()
    }else if(this.statusCurrent>this.inforOrder.status){
      this.toast.warning("Không thể chuyển trạng thái đơn hàng về trạng thái trước đó")
      setTimeout((data:any)=>{this.inforOrder.status=this.statusCurrent},100)
      this.changeDetef.detectChanges()
    }
  }
}
