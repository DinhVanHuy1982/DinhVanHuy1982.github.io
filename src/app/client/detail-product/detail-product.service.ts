import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {

  API = environment.API_GATEWAY_ENDPOINT+"product/comment";
  constructor(private httpClient: HttpClient) { }

  public uploadComment(files:FileList){
    // const headers = new HttpHeaders({
    //   // 'mimeType': 'multipart/form-data',
    //   'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>', // Đảm bảo định dạng nội dung đúng,
    //   // 'Access-Control-Allow-Origin': '*',
    // });
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    return this.httpClient.post(this.API,formData);
  }

  public testAPI(){
    return this.httpClient.get(environment.API_GATEWAY_ENDPOINT+"product/testAPI")
  }
}
