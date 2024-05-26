import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {CartService} from "./cart.service";
import {environment} from "../../../environment/environment";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  CreateUpdateBrandComponent
} from "../../admin/Views/Pages/brand-management/create-update-brand/create-update-brand.component";
import {CreateOrderComponent} from "./create-order/create-order.component";
import {Toast, ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../admin/Views/Pages/product-management/product.service";
import {UserService} from "../../viewsShare/Views/user.service";
import {
  ActionImportProductComponent
} from "../../admin/Views/Pages/import-product-management/action-import-product/action-import-product.component";
import {DatePipe} from "@angular/common";
import {NO_ROW_GRID_TEMPLATE} from "../../../helpers/constants";
import {OrderService} from "../../admin/Views/Pages/order-management/order.service";
import {ActionViewOrderComponent} from "./action-view-order/action-view-order.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  allComplete: boolean = false;
  domainFile = environment.DOMAIN_FILE_SERVER
  tabSlected=0;// tab chọn hiển thị 0 trong giỏ, 1 đang giao hàng, 2 đã hoàn thành
  noRowsTemplate = NO_ROW_GRID_TEMPLATE;
  constructor(private cartService:CartService,
              public dialog: MatDialog,
              private toast:ToastrService,
              private activateRouter:ActivatedRoute,
              private productService: ProductService,
              private userService:UserService,
              private datePipe: DatePipe,
              private orderService:OrderService) {
  }
  task:Task  = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
  someComplete(): boolean {
    if (this.rowData == null) {
      return false;
    }
    return this.rowData.filter((t:any) => t.slected).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.rowData == null) {
      return;
    }
    this.rowData.forEach((t:any) => (t.slected = completed));
  }
  updateAllComplete() {
    this.allComplete = this.rowData.every((t:any) => t.slected);
  }

  ngOnInit(): void {
    this.serachCart();
    this.setStatusForPayOnline();
  }

  currentUser:any
  serachCart(){
    this.userService.getUserCurrent().subscribe((res:any)=>{
      if(res) {
        this.currentUser=res;
        this.cartService.getAllCart(res?.id).subscribe((data:any)=>{
          this.rowData=data.data;
        })
      }
    });

  }

  setStatusForPayOnline(){
    this.activateRouter.queryParams.subscribe((params:any) => {
      const vnp_Amount = params['vnp_Amount'];
      const vnp_BankCode = params['vnp_BankCode'];
      const vnp_BankTranNo = params['vnp_BankTranNo'];
      const vnp_CardType = params['vnp_CardType'];
      const vnp_OrderInfo = params['vnp_OrderInfo'];
      const vnp_PayDate = params['vnp_PayDate'];
      const vnp_ResponseCode = params['vnp_ResponseCode'];
      const vnp_TmnCode = params['vnp_TmnCode'];
      const vnp_TransactionNo = params['vnp_TransactionNo'];
      const vnp_TransactionStatus = params['vnp_TransactionStatus'];
      const vnp_TxnRef = params['vnp_TxnRef'];
      const vnp_SecureHash = params['vnp_SecureHash'];

      if(vnp_TransactionStatus=="00" && vnp_OrderInfo){
        this.productService.updatePayMentStatusOfOrder(vnp_OrderInfo).subscribe((res:any)=>{
          if(res.status=="OK"){
            this.toast.success(res.message)
          }else{
            this.toast.error(res.message)
          }
        },(err:any)=>{this.toast.error(err.message)})
      }

      // Xử lý các giá trị này theo nhu cầu của bạn
      console.log({
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash
      });
    });
  }

  rowData:any;
  decrease(item:any) {
    if (item.quantity > 0) {
      item.quantity--
    }
  }
  increase(item:any) {
    item.quantity++
  }
  sumProduct(type:number){
    if(type===1){
      let sumProduct=0;
      this.rowData.forEach((item:any)=>{
        if(item.slected){
          sumProduct+=item.quantity;
        }
      })
      return sumProduct;
    }else if(type===2){
      let sumPriceProduct=0;
      this.rowData.forEach((item:any)=>{
        if(item.slected){
          if(item.maxPurchase){
            sumPriceProduct+=(item.quantity*(item.price*((100-item.maxPurchase)/100)));
          }else{
            sumPriceProduct+=(item.quantity*item.price);
          }
        }
      })
      return sumPriceProduct;
    }else{
      return 0
    }

  }

  rowDataShipingComplete:any;

  changeTab(number: number) {
    this.tabSlected=number;
    this.rowDataShipingComplete=[];
    if(number==1){
      this.orderService.getListCartShippingAndComplete(this.currentUser.id,number).subscribe((res:any)=>{
        if(res.status==='OK'){
          this.rowDataShipingComplete=res.data.map((item:any)=>{
            const date = new Date(item.orderDate*1000)
            item.tabSelected=1;
            item.orderDate= this.datePipe.transform(date, 'dd/MM/yyyy');

            return item;
          });
        }
      })
    }else if(number==2){
      this.orderService.getListCartShippingAndComplete(this.currentUser.id,number).subscribe((res:any)=>{
        if(res.status==='OK'){
          this.rowDataShipingComplete=res.data.map((item:any)=>{
            const date = new Date(item.orderDate*1000)
            item.tabSelected=2;
            item.orderDate= this.datePipe.transform(date, 'dd/MM/yyyy');

            return item;
          });
        }
      })
    }else if(number==3){
      this.orderService.getListCartShippingAndComplete(this.currentUser.id,number).subscribe((res:any)=>{
        if(res.status==='OK'){
          this.rowDataShipingComplete=res.data.map((item:any)=>{
            const date = new Date(item.orderDate*1000)
            item.tabSelected=3;
            item.orderDate= this.datePipe.transform(date, 'dd/MM/yyyy');

            return item;
          });
        }
      })
    }
  }

  coloumDef:any[]=[
    {
      headerName: 'STT',
      valueGetter: (param:any) => {
        return (param.node.rowIndex + 1)
      },
      width: 100,
      pinned: 'left',
    },{
      headerName: "Mã đơn hàng",
      field: "orderCode",
    },{
      headerName: "Ngày đặt",
      field: "orderDate",
    },{
      headerName: "Số điện toại liên hệ",
      field: "phoneNumber",
    },{
      headerName: "Giá đơn hàng",
      field: "price",
    },{
      headerName: "Phí vân chuyển",
      field: "shipPrice",
    },{
      headerName: "Trạng thái đơn hàng",
      field: "status",
      valueGetter: (param:any) => {
        if(param.data?.status == 0){
          return "Đợi xác nhận"
        }else if(param.data?.status == 1){
          return "Đã xác nhận"
        }else if(param.data?.status == 2){
          return "Đang giao hàng"
        }else if(param.data?.status == 3){
          return "Đã hoàn thành"
        }else{
          return "Hoàn hủy"
        }
      },
    },{
      headerName: "Phương thức thanh toán",
      field: "paymentMethod",
      valueGetter: (param:any) => {
        if(param.data?.paymentMethod == 1){
          return "Thanh toán online"
        }else{
          return "Thanh toán khi nhận hàng"
        }
      },
    },{
      headerName: "Trạng thái thanh toán",
      field: "payStatus",
      valueGetter: (param:any) => {
        if(param.data?.payStatus == 0){
          return "Chưa thanh toán"
        }else{
          return "Đã thanh toán"
        }
      },
    },{
      headerName: 'Action',
      cellRenderer: ActionViewOrderComponent,
      pinned: 'right',
      cellStyle: {
        'font-weight': '500',
        'font-size': '12px',
        'line-height': '30px',
        color: '#101840',
        display: 'flex',
        'justify-content': 'center',
        overflow: 'unset',
      },
      field: '',
      lockPosition: true,
      width:100,
      cellClass: 'cell-action',
    }
  ]

  gridSizeChanged(params:any) {
    params.api.sizeColumnsToFit();
  }

  createOrder() {
    let productOrder=this.rowData.filter((item:any)=>item.slected)
    if(productOrder.length==0){
      this.toast.warning("Bạn cần chọn sản phẩm trước khi thực hiện đặt hàng")
    }else{
      const dialogConfig={
        height: '80vh',
        width:'700px',
        maxHeight: '90vh',
        maxWidth: '90vw',
        disableClose: false,
        hasBackdrop: true,
        data: productOrder
      };
      this.dialog.open(CreateOrderComponent, dialogConfig).afterClosed().subscribe((data:any)=>
        {
          // this.search()
        }
      )
    }
  }

  protected readonly NO_ROW_GRID_TEMPLATE = NO_ROW_GRID_TEMPLATE;

  removeOutCart() {

    this.cartService.deleteCart(this.cartDelete).subscribe((res:any)=>{
      if(res.status=='OK'){
        this.toast.success("Xóa thành công")
      }else{
        this.toast.warning(res.message)
      }
      this.dialog.closeAll()
    })

  }
  cartDelete:any;
  openmodalDeleteCart(template:any,idCart:any){
    this.cartDelete = idCart;
    const dialogConfig= {
      disableClose: false,
      hasBackdrop: true,
      width: '450px',
      borderRadius:'10px'
    };
    this.dialog.open(template,dialogConfig).afterClosed().subscribe(()=>{
      this.cartDelete=null;
      this.serachCart();
    })
  }
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
