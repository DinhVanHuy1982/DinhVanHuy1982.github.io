import {AfterViewInit, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {FileDetailComponent} from "../../core/compontnts/file-detail/file-detail.component";
import {environment} from "../../../environment/environment";
import {DetailProductService} from "./detail-product.service";
import {ToastrService} from "ngx-toastr";
import {HttpHeaders} from "@angular/common/http";
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements AfterViewInit{

  lstReviewsView: any[] = [];

  isSafari = false;
  domainFile = environment.DOMAIN_FILE_LOCAL;

  isViewMoreInfoBook=true;
  num=1;
  toTalRate1 = 1;
  toTalRate2 = 2;
  toTalRate3 = 3;
  toTalRate4 = 3;
  toTalRate5 = 2;
  totalReviewsBook :any;
  avatarBook = 'https://cdn-migi-2.laosedu.la/f/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/72ce1bb0d1cb8b3c32dc254d35dbca3ca335aa25a39a1060e7dd5ed340d96b83/ming6.jpg';
  listAvatarBook = [
    'https://cdn-migi-2.laosedu.la/f/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/72ce1bb0d1cb8b3c32dc254d35dbca3ca335aa25a39a1060e7dd5ed340d96b83/ming6.jpg',
    'https://cdn-migi-2.laosedu.la/f/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/de366a9b4644c6c2d968a5ae664e1ad7fae2085f34941811767736c14ed0c479/img3.jpg',
    'https://cdn-migi-2.laosedu.la/f/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/72ce1bb0d1cb8b3c32dc254d35dbca3ca335aa25a39a1060e7dd5ed340d96b83/ming6.jpg',
    'https://cdn-migi-2.laosedu.la/f/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/725b26fdfc02b1c7174da5d940e2c46d4232e159fbec43a9ff1ee42653cbfde0/img4.jpg',
    'https://cdn-migi-2.laosedu.la/f/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/0cb922589e4f88eeb43339c5a18193658c961545fcf813e0924e49b821a22d44/img5.jpg'
  ]
  // modalRef!: BsModalRef ;
  disableWishList=false;
  bookInfo={
    "id": 6,
    "code": "BK2024335260",
    "name": "Không Phải Sói Nhưng Cũng Đừng Là Cừu UPDATE",
    "topicBookId": 318,
    "avatar": "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/2b092b5ea1a2b8521cb146ced15102d06ed51fe6593292d394f2b77540c588ad/_khong-phai-soi-nhung-cung-dung-la-cuu.jpg,/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/de366a9b4644c6c2d968a5ae664e1ad7fae2085f34941811767736c14ed0c479/img3.jpg,/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/72ce1bb0d1cb8b3c32dc254d35dbca3ca335aa25a39a1060e7dd5ed340d96b83/ming6.jpg,/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/725b26fdfc02b1c7174da5d940e2c46d4232e159fbec43a9ff1ee42653cbfde0/img4.jpg,/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/0cb922589e4f88eeb43339c5a18193658c961545fcf813e0924e49b821a22d44/img5.jpg",
    "avgRate": 3.0,
    "totalSold": 2,
    "totalReview": 5,
    "author": "Lê Bảo Ngọc",
    "publisher": "Skybooks Việt Nam",
    "bookDetailsCode": "BK20243352602,BK20243352601,BK20243352600",
    "bookDetailsId": "12,11,10",
    "bookTypes": "2,1,0",
    "bookPrices": "180000,140000,100000",
    "sellersName": "My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38",
    "issuer": "Công ty TNHH văn hóa & truyền thông Skybooks Việt Nam",
    "translator": "Không",
    "pageNumber": 0,
    "publicationTime": "2023-01-09",
    "coverType": 0,
    "dimension": "16x24",
    "description": " \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân.  \"Không Phải Sói Nhưng Cũng Đừng Là Cừu\" của tác giả Lê Bảo Ngọc là một cuốn sách độc đáo, giúp định hướng cho người đọc về cách sống và làm việc một cách hiệu quả mà không cần trở thành \"sói\" hay \"cừu\". Có bao giờ bạn chợt ngồi lại nghĩ về thời gian mà bạn đã trải qua như thế nào? Có bao giờ bạn nghĩ đến giá trị của quãng thời gian ấy, cái gọi là tuổi trẻ? “ Nếu tôi còn ở tuổi đôi mươi, hẳn là tôi sẽ đọc Tuổi trẻ đáng giá bao nhiêu? Nhiều hơn một lần” đó là lời nói của tác giả - nhà báo Đặng Nguyễn Đông Vy nhận định về cuốn sách “Tuổi trẻ đáng giá bao nhiêu”. Chỉ với 285 trang sách tác giả Rosie Nguyễn sẽ giúp ích rất nhiều cho những bạn trẻ chuẩn bị bước vào những tháng năm đẹp nhất của cuộc đời – cái mà người ta gọi là thanh xuân. ",
    "sellerIsdn": "1682311065907",
    "sellerAvatar": "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/611f19d19d8a00060ac8a74de4372ab33e447c92863f3dfa50579bf6f961f2be/image_picker_4DE31915-BB1E-4E19-806F-B38FB798D845-38797-000000B235794C48.jpg",
    "sellerFullname": "My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38",
    "sellerSubject": "Lập trình hướng đối tượng, Ngôn ngữ lập trình 2",
    "sellerSpecializeLevel": "0",
    "sellerExp": "2",
    "sellerDepartment": "Không có gì",
    "sellerIntro": "- Là một người yêu tiếng Anh, cô My Pham rất mong muốn truyền tải những nét đẹp, nét hay của thứ ngôn ngữ toàn cầu này cho các thế hệ học trò. Điều này được thể hiện rõ thông qua quá trình tương tác với các em học sinh. Cô My luôn sẵn sàng trả lời mọi câu hỏi của các em học sinh bất kể cô đang bận hay cơ thể đang mệt mỏi.\n\n- Với kinh nghiệm nhiều năm giảng dạy và ôn thi đại học môn tiếng anh, cô đưa ra những kiến thức trọng tâm, phù hợp với xu hướng ra đề thi.\n\n- Cô có cách truyền đạt rõ ràng, nhẹ nhàng, luôn giữ được sự hoạt bát, năng động, tươi trẻ trong suốt bài giảng giúp duy trì sự hứng thú của học sinh khiến học sinh không còn cảm giác sợ môn Tiếng Anh, ngược lại còn giúp các em hứng thú và yêu thích môn học này hơn.",
    "inCart": "0,0,0",
    "inPurchase": "1,1,0",
    "inWishlist": 1,
    "haveHot": true,
    "haveBestSeller": true,
    "hardBook": {
      "id": 10,
      "code": "BK20243352600",
      "type": 0,
      "price": 100000,
      "inCart": 0,
      "inPurchase": 0
    },
    "audioBook": {
      "id": 12,
      "code": "BK20243352602",
      "type": 2,
      "price": 180000,
      "inCart": 0,
      "inPurchase": 1
    },
    "ebook": {
      "id": 11,
      "code": "BK20243352601",
      "type": 1,
      "price": 140000,
      "inCart": 0,
      "inPurchase": 1
    }
  };
  typeBookChoose = this.bookInfo.hardBook;
  priceOfTypeBook: number | 0 | undefined;
  rate1: any;
  rate2: any;
  rate3: any;
  rate4: any;
  rate5: any;
   constructor(
     private sanitizer: DomSanitizer,
     private matDialog: MatDialog,
     private elementRef: ElementRef,
     private changeDetectorRef: ChangeDetectorRef,
     private detailProduct: DetailProductService,
     private toast: ToastrService
   ) {

     this.lstReviewsView=[{
       "id" : 526,
       "rate" : 3,
       "contentBuyer" : "Sách đọc hay quá  nhưng ship hơi lâu",
       "parentId" : null,
       "createTime" : "2024-02-23T10:40:12Z",
       "createName" : "1682311065907",
       "productType" : 3,
       "productCode" : "BK2024335260",
       "purchaseDetailsId" : null,
       "filePathBuyer" : "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/2daef71fa50c9661c71a7f163451f7e16f33d3b74ba70c854cac5ecd9f19b11a/12bd828b5c1eb8d66268225a6813e770 (1).jpg",
       "fileIdBuyer" : "65d8760ccd02561635ef6107",
       "fileNameBuyer" : "12bd828b5c1eb8d66268225a6813e770 (1).jpg",
       "listFileBuyer" : [ {
         "fileId" : "65d8760ccd02561635ef6107",
         "fileName" : "12bd828b5c1eb8d66268225a6813e770 (1).jpg",
         "path" : "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/2daef71fa50c9661c71a7f163451f7e16f33d3b74ba70c854cac5ecd9f19b11a/12bd828b5c1eb8d66268225a6813e770 (1).jpg",
         "type" : 0
       } ],
       "avatarBuyer" : "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/611f19d19d8a00060ac8a74de4372ab33e447c92863f3dfa50579bf6f961f2be/image_picker_4DE31915-BB1E-4E19-806F-B38FB798D845-38797-000000B235794C48.jpg",
       "fullNameBuyer" : "My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38",
       "contentSeller" : "Đội ơn quý khách đã góp ý!",
       "filePathSeller" : "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/abb63f0c2986de8926295112f0206e41978a1469b2fd973b22d9a9ec9c0ea4e8/thankyou.jpg",
       "fileIdSeller" : "65d87cc7cd02561635ef613d",
       "fileNameSeller" : "thankyou.jpg",
       "listFileSeller" : [ {
         "fileId" : "65d87cc7cd02561635ef613d",
         "fileName" : "thankyou.jpg",
         "path" : "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/abb63f0c2986de8926295112f0206e41978a1469b2fd973b22d9a9ec9c0ea4e8/thankyou.jpg",
         "type" : 0
       } ],
       "avatarSeller" : "/laosedu/4fc25ce6eb8c97f4cb1deb10be041ce3/611f19d19d8a00060ac8a74de4372ab33e447c92863f3dfa50579bf6f961f2be/image_picker_4DE31915-BB1E-4E19-806F-B38FB798D845-38797-000000B235794C48.jpg",
       "fullNameSeller" : "My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38 My Pham はな\uD83C\uDF38"
     }];
     this.totalReviewsBook= this.toTalRate1 +this.toTalRate2 +this.toTalRate3 +this.toTalRate4 +this.toTalRate5;
     this.rate1 = (this.toTalRate1 * 100 / this.totalReviewsBook).toFixed(5);
     this.rate2 = (this.toTalRate2 * 100 / this.totalReviewsBook).toFixed(5);
     this.rate3 = (this.toTalRate3 * 100 / this.totalReviewsBook).toFixed(5);
     this.rate4 = (this.toTalRate4 * 100 / this.totalReviewsBook).toFixed(5);
     this.rate5 = (this.toTalRate5 * 100 / this.totalReviewsBook).toFixed(5);
   }
  changeShowAvatar(item :any){
    this.avatarBook = item;
  }
  getRateBook(avg:any) {
    return this.sanitizer.bypassSecurityTrustHtml(this.genderRate(avg));
  }
  genderRate(avgRate:any) {
    let rs = ``;
    for (let i = 0; i < 5; i++) {
      if (i < avgRate)
        if (avgRate - i < 1) {
          rs += `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.10276 3.60556C6.94719 2.09073 7.36941 1.33331 8.00065 1.33331C8.63189 1.33331 9.05411 2.09073 9.89854 3.60556L10.117 3.99747C10.357 4.42794 10.4769 4.64317 10.664 4.78518C10.8511 4.9272 11.0841 4.97991 11.5501 5.08535L11.9743 5.18133C13.6141 5.55235 14.434 5.73786 14.629 6.36513C14.8241 6.99241 14.2652 7.64603 13.1473 8.95326L12.858 9.29146C12.5404 9.66294 12.3815 9.84867 12.3101 10.0785C12.2386 10.3082 12.2626 10.5561 12.3107 11.0517L12.3544 11.5029C12.5234 13.247 12.6079 14.1191 12.0972 14.5068C11.5865 14.8945 10.8189 14.541 9.28354 13.8341L8.88633 13.6512C8.45003 13.4503 8.23189 13.3499 8.00065 13.3499C7.76942 13.3499 7.55127 13.4503 7.11498 13.6512L6.71777 13.8341C5.18243 14.541 4.41477 14.8945 3.90408 14.5068C3.3934 14.1191 3.4779 13.247 3.64692 11.5029L3.69064 11.0517C3.73867 10.5561 3.76268 10.3082 3.69123 10.0785C3.61977 9.84867 3.46093 9.66294 3.14326 9.29146L2.85405 8.95326C1.73615 7.64603 1.1772 6.99241 1.37227 6.36513C1.56733 5.73786 2.38722 5.55235 4.02701 5.18133L4.45124 5.08535C4.91722 4.97991 5.15021 4.9272 5.33728 4.78518C5.52435 4.64317 5.64433 4.42794 5.8843 3.99747L6.10276 3.60556Z" fill="url(#paint0_linear_33733_39290)"/>
          <defs>
          <linearGradient id="paint0_linear_33733_39290" x1="1.73402" y1="8.40001" x2="14.4006" y2="8.40001" gradientUnits="userSpaceOnUse">
          <stop offset="0.495484" stop-color="#F3A412"/>
          <stop offset="0.501047" stop-color="#E6E6E6"/>
          </linearGradient>
          </defs>
          </svg>
              `
        } else {
          rs += `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.10276 3.60556C6.94719 2.09073 7.36941 1.33331 8.00065 1.33331C8.63189 1.33331 9.05411 2.09073 9.89854 3.60556L10.117 3.99747C10.357 4.42794 10.4769 4.64317 10.664 4.78518C10.8511 4.9272 11.0841 4.97991 11.5501 5.08535L11.9743 5.18133C13.6141 5.55235 14.434 5.73786 14.629 6.36513C14.8241 6.99241 14.2652 7.64603 13.1473 8.95326L12.858 9.29146C12.5404 9.66294 12.3815 9.84867 12.3101 10.0785C12.2386 10.3082 12.2626 10.5561 12.3107 11.0517L12.3544 11.5029C12.5234 13.247 12.6079 14.1191 12.0972 14.5068C11.5865 14.8945 10.8189 14.541 9.28354 13.8341L8.88633 13.6512C8.45003 13.4503 8.23189 13.3499 8.00065 13.3499C7.76942 13.3499 7.55127 13.4503 7.11498 13.6512L6.71777 13.8341C5.18243 14.541 4.41477 14.8945 3.90408 14.5068C3.3934 14.1191 3.4779 13.247 3.64692 11.5029L3.69064 11.0517C3.73867 10.5561 3.76268 10.3082 3.69123 10.0785C3.61977 9.84867 3.46093 9.66294 3.14326 9.29146L2.85405 8.95326C1.73615 7.64603 1.1772 6.99241 1.37227 6.36513C1.56733 5.73786 2.38722 5.55235 4.02701 5.18133L4.45124 5.08535C4.91722 4.97991 5.15021 4.9272 5.33728 4.78518C5.52435 4.64317 5.64433 4.42794 5.8843 3.99747L6.10276 3.60556Z" fill="#F3A412"/>
          </svg>
          `
        }
      else
        rs += `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.10276 3.60562C6.94719 2.09079 7.36941 1.33337 8.00065 1.33337C8.63189 1.33337 9.05411 2.09079 9.89854 3.60562L10.117 3.99753C10.357 4.428 10.4769 4.64323 10.664 4.78525C10.8511 4.92726 11.0841 4.97997 11.5501 5.08541L11.9743 5.18139C13.6141 5.55241 14.434 5.73792 14.629 6.36519C14.8241 6.99247 14.2652 7.64609 13.1473 8.95332L12.858 9.29152C12.5404 9.663 12.3815 9.84873 12.3101 10.0785C12.2386 10.3083 12.2626 10.5561 12.3107 11.0517L12.3544 11.503C12.5234 13.2471 12.6079 14.1192 12.0972 14.5069C11.5865 14.8945 10.8189 14.5411 9.28354 13.8342L8.88633 13.6513C8.45003 13.4504 8.23189 13.3499 8.00065 13.3499C7.76942 13.3499 7.55127 13.4504 7.11498 13.6513L6.71777 13.8342C5.18243 14.5411 4.41477 14.8945 3.90408 14.5069C3.3934 14.1192 3.4779 13.2471 3.64692 11.503L3.69064 11.0517C3.73867 10.5561 3.76268 10.3083 3.69123 10.0785C3.61977 9.84873 3.46093 9.663 3.14326 9.29152L2.85405 8.95332C1.73615 7.64609 1.1772 6.99247 1.37227 6.36519C1.56733 5.73792 2.38722 5.55241 4.02701 5.18139L4.45124 5.08541C4.91722 4.97997 5.15021 4.92726 5.33728 4.78525C5.52435 4.64323 5.64433 4.428 5.8843 3.99753L6.10276 3.60562Z" fill="#E5E5E5"/>
        </svg>`
    }
    return rs
  }
  matdialogPopup: any;
  changeWishlist(bookData: any, action: boolean, template: any, typeCart: number) {
    this.matdialogPopup = this.matDialog.open(template)
  }
  toggleWishList(){

  }
  addToCart(type: any, num: number){}
  goToLibrary(){}
  goToCart(){}
  addBuyNow(){}
  decrease() {
    if (this.num > 0) {
      this.num--
    }
  }

  increase() {
    this.num++
  }

  changeChooseBook(type:any) {
    // set giá tương ứng với từng loại sách 0: sách in, 1: sách điện tử, 2: sách nói
    if (type === 0) {
      this.typeBookChoose = this.bookInfo.hardBook;
      this.priceOfTypeBook = this.bookInfo.hardBook.price;
      // this.bookAddCart = this.bookInfo.hardBook;
    } else if (type === 1) {
      this.typeBookChoose = this.bookInfo.ebook;
      this.priceOfTypeBook = this.bookInfo.ebook.price;
      // this.bookAddCart = this.bookInfo.ebook;
    } else if (type === 2) {
      this.typeBookChoose = this.bookInfo.audioBook;
      this.priceOfTypeBook = this.bookInfo.audioBook.price;
      // this.bookAddCart = this.bookInfo.audioBook;
    }
  }
  getViewMoreInfo(className:any, heightCheck:any) {
    // Lấy tham chiếu đến phần tử div
    const divElement = this.elementRef.nativeElement.querySelector(className);
    // Lấy chiều cao của phần tử div
    const divHeight = divElement.offsetHeight;
    // check xem có hiển thị view more thông tin
    return divHeight == heightCheck;
  }

  setPercentRate() {
    const colRate1 = document.getElementById('colRate1') as HTMLInputElement;
    const colRate2 = document.getElementById('colRate2') as HTMLInputElement;
    const colRate3 = document.getElementById('colRate3') as HTMLInputElement;
    const colRate4 = document.getElementById('colRate4') as HTMLInputElement;
    const colRate5 = document.getElementById('colRate5') as HTMLInputElement;

    if (colRate1 && colRate1?.style) {
      colRate1.style.width = this.rate1 + '%'
    }

    if (colRate2 && colRate2?.style) {
      colRate2.style.width = this.rate2 + '%'
    }

    if (colRate3 && colRate3?.style) {
      colRate3.style.width = this.rate3 + '%'
    }

    if (colRate4 && colRate4?.style) {
      colRate4.style.width = this.rate4 + '%'
    }

    if (colRate5 && colRate5?.style) {
      colRate5.style.width = this.rate5 + '%'
    }
  }

  ngAfterViewInit(): void {
    this.setPercentRate();

    // nhận dạng sự kiện thay đổi
    this.changeDetectorRef.detectChanges();
  }

  sentComment(){
    if(this.formImgComment){

      this.detailProduct.uploadComment(this.formImgComment).subscribe((res:any)=>{
        if(res.status === 'OK'){
          this.toast.success("Bình luận thành công")
        }else{
          this.toast.error("Lỗi bình luận")
        }
      })
    }
    this.detailProduct.testAPI().subscribe((data:any)=>{
      console.log(data)
    })
  }
  comment(template:any){
    this.matdialogPopup = this.matDialog.open(template);
  }

  callInforReview(noValue:any, event:any){

  }

  showMore(lst:any, i:number) {
    const data = { lstFile: lst, index: i };
    this.matDialog.open(FileDetailComponent, {
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

  commentValue:any;
  fileUploadComment:any;
  formImgComment:any;
  uploadComment(event:any){
    this.formImgComment  = event.target.files;
    // console.log('File Import in upload : ',files);
    // this.fileUploadComment = files;
    // if (files.length > 0) {
    //
    //   const formData = new FormData();
    //
    //   // thêm 1 field vào formData
    //   console.log('File: ', files);
    //   // files.forEach((file: any) => {
    //   //
    //   // });
    //   formData.append('file', files);
    //
    //   this.formImgComment = formData;
    //   console.log('Form Data: ', this.formImgComment);
    //   // this.isShowImport = false;
    //   return ;
    // }else{
    //   return ;
    // }
  }
}
