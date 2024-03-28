import {ChangeDetectorRef, Component, TemplateRef, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";

@Component({
  selector: 'app-action-role-management',
  templateUrl: './action-role-management.component.html',
  styleUrls: ['./action-role-management.component.scss']
})
export class ActionRoleManagementComponent implements ITooltipAngularComp {

  private params!: any;
  public data!: any;
  public color!: string;
  positionFixed = false;

  hasImage: boolean = false;

  renderContent: MathContent = {
    latex: '',
    mathml: '',
  };

  agInit(params: any): void {
    this.params = params;
    this.data = params.columnData || '';
    this.renderContent.mathml = params.columnData || '';
    this.color = this.params.color || '#cbcedc';
    if (params.columnData && params.columnData.includes('<img')) {
      this.hasImage = true;
    }


    if (params?.data?.type === 'TN' && params.colDef.type === '3' && params.columnData) {
      this.renderContent.mathml = this.translate.instant('QUESTION_BANK.CHOOSE_ANSWER') + ' ' + this.translate.instant('QUESTION_BANK.ANSWER' + params.columnData);
    }

    if(params?.positionFixed){
      this.positionFixed = params.positionFixed;
    }
  }

  constructor(
              private toast: ToastrService,
              public matDialog: MatDialog,
              private translate: TranslateService,
              private cd: ChangeDetectorRef) {

  }


  updateLibCategory() {
    // this.matDialog.open(CreateUpdateTopicExamPackageComponent, {
    //   data:JSON.parse(JSON.stringify(this.item)) ,
    //   disableClose: false,
    //   hasBackdrop: true,
    //   width: '760px',
    //   maxHeight: '90vh',
    //   autoFocus: false
    // }).afterClosed().subscribe(res => {
    //   if (!res || res.event === 'cancel'){
    //
    //   } else {
    //     this.topicExamPackageComponent.searchData(this.topicExamPackageComponent.topicExamPackage);
    //   }
    //
    //
    // })
  }
  disableDelete = true;
  deleteLibCategory(){

  }
  openModal(template: TemplateRef<any>) {
    this.disableDelete = false;
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'addnew-unit-md modal-dialog-custom delete-lib-cate modal-topic-exam-package' })
    // );
    this.matDialog.open(this.template, {
      disableClose: false,
      hasBackdrop: true,
      width: '464px',
      maxHeight: '90vh',
      autoFocus: false,
      // panelClass: ['addnew-unit-md modal-dialog-custom delete-lib-cate modal-topic-exam-package']
    })
  }
  @ViewChild('template') template :any;
}
export interface MathContent {
  latex?: string;
  mathml?: string;
}
