import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../../core/_base/layout/service/breadcrumb.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit{

  constructor(private router: Router, private breadcumService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcumService.setBreadcrumb(['Dasboard']);
  }

}
