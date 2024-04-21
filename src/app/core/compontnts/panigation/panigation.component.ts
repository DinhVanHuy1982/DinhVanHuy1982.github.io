import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {CommonServiceService} from "../../../../core/service/utils/common-service.service";
import {PAGE_SIZE} from "../../../../helpers/constants";

@Component({
  selector: 'app-panigation',
  templateUrl: './panigation.component.html',
  styleUrls: ['./panigation.component.scss']
})
export class PanigationComponent {
  @Input() total: any;
  @Input() totalPage: any;
  @Input() dataLength: any;
  @Input() pageSize: any;
  @Input() currentPage: any;
  @Input() collapse: boolean = false;

  @Output() paginate: EventEmitter<number> = new EventEmitter(false);

  public rangeWithDots: any[];
  public first: number = 0;
  public last: number = 0;

  constructor(private commonService: CommonServiceService) {

    this.rangeWithDots=[];
  }

  public ngOnInit(): void {
    this.pageSize = this.pageSize ?? PAGE_SIZE;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.rangeWithDots = this.commonService.pagination(
      this.currentPage,
      this.totalPage,
      this.collapse
    );
    this.first = this.pageSize * (this.currentPage - 1) + 1;
    this.last = this.dataLength + this.pageSize * (this.currentPage - 1);
  }

  public prev(): void {
    this.currentPage--;
    if (this.currentPage < 1) {
      this.currentPage = 1;
      return;
    }
    this.page(this.currentPage);
  }

  public next(): void {
    this.currentPage++;
    if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage;
      return;
    }

    this.page(this.currentPage);
  }

  public page(page: number): void {
    this.currentPage = page;
    this.paginate.next(this.currentPage);
  }

}
