import {Component, Inject} from '@angular/core';
import {environment} from "../../../../environment/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Optional} from "ag-grid-community";

@Component({
  selector: 'kt-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent {
  itemFile:any;
  linkFile = environment.DOMAIN_FILE_SERVER;
  popup = (document.querySelector('.file-position') as HTMLElement)
  checkHeight = false;
  checkWidth = false;

  constructor(public dialogRef: MatDialogRef<FileDetailComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.itemFile = this.data.lstFile[this.data.index];
    console.log(this.data);
    console.log('linkFile', this.linkFile);
    setTimeout(() => {
      this.checkSize();
      this.checkSize2();
    },150)
  }

  next() {
    if (this.data.index !== this.data.lstFile.length) {
      this.data.index += 1;
      this.itemFile = this.data.lstFile[this.data.index];
    }
    setTimeout(() => {
      this.checkSize();
      this.checkSize2();
    },150)
  }

  prev() {
    if (this.data.index !== 0) {
      this.data.index -= 1;
      this.itemFile = this.data.lstFile[this.data.index];
    }
    setTimeout(() => {
      this.checkSize();
      this.checkSize2();
    },150)
  }

  checkSize(){
    const h = (document.querySelector('.checkImg2') as HTMLElement)?.offsetHeight
    const w = (document.querySelector('.checkImg2') as HTMLElement)?.offsetWidth
    this.checkHeight = h > w && h !== 625
  }

  checkSize2(){
    const h = (document.querySelector('.checkImg2') as HTMLElement)?.offsetHeight
    const w = (document.querySelector('.checkImg2') as HTMLElement)?.offsetWidth
    this.checkWidth = h < w && w !== 860
  }

  closePopUp(){
    this.dialogRef.close();
  }
}
