import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable,finalize,interval } from 'rxjs';
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig } from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';
import { Select, Store } from '@ngxs/store';
import { NgModel } from '@angular/forms';
import { Options } from "@angular-slider/ngx-slider";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { async } from '@firebase/util';
import {handler} from '../api/predictions/[id]'
import { UrlState } from 'src/app/core/store/URL/url.actions'
import { urlState } from '../core/store/URL/url.state';

@Component({
  selector: 'app-config-section',
  templateUrl: './config-section.component.html',
  styleUrls: ['./config-section.component.scss']
})
export class ConfigSectionComponent implements OnInit, AfterViewInit {
  ///slider////
  pose: number = 0;
  imageResponse: any
  age: number = 0;
  eyeGlasses: boolean;
  smile: boolean;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  poseoptions: Options = {
    floor: -3,
    ceil: 3
  };

  //////////////////////////////////////
  private authToken: string;
  files: File[] = [];
  file: File;
  resultFile: File;
  stateData: any;
  originalImageSrc = ""
  resultImageSrc = ""
  stateUrl:string
  isLoading:boolean
  @Select()
  configState$: Observable<configState>;

  @Select()
  urlState$: Observable<urlState>;

  response:any


  constructor(private http: HttpClient) {

  }
  ngAfterViewInit() {

  }
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //     //const file = params['file']
    //     console.log(params)
    //     //this.file = file
    //   }
    //     )
    let stateUrl
    this.configState$.subscribe(file => { this.stateData = file })
    console.log("ConfigState==>", this.stateData.File);
    
    this.urlState$.subscribe(url => { stateUrl = url })
    this.stateUrl = stateUrl.url
    console.log("stateUrlB==>",this.stateUrl)
    this.file = this.stateData.File
    this.files.push(this.file)
  }

  submit() {
    this.resultFile=null

    let eyeGlasses: number
    let smile: number
    if (this.eyeGlasses == true) 
    {eyeGlasses = 3 }
    else{eyeGlasses = -3}
    if (this.smile == true) 
    {smile = 3;}
    else{smile = -3}



    const params = new HttpParams()
      .append('num_sample', 1)
      .append('noise_seed', 0)
      .append('age', this.age)
      .append('eyeglasses', eyeGlasses)
      .append('gender', 0)
      .append('pose', this.pose)
      .append('smile', smile);
    console.log("params=>" + params)
    const formData = new FormData();
    formData.append('file', this.file);
    this.http.post("http://331b-35-240-135-64.ngrok.io/getImgAttr?" + params, formData)
      .subscribe(response => {
        console.log(response)
        this.imageResponse = response
        this.imageResponse = this.imageResponse.image
        this.setResultImage(this.imageResponse)
      })

    }
    // submit() {
    // this.resultFile = null

    // let eyeGlasses: number
    // let smile: number
    // if (this.eyeGlasses == true) { eyeGlasses = 3 }
    // else { eyeGlasses = -3 }
    // if (this.smile == true) { smile = 3; }
    // else { smile = -3 }
    // let age=this.age.toString()
    // console.log("age==>",age)
    

    // ///////////////////////////
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Token 5804b5bf1a52d95591be094f9c845c0babb2996b`,
    //     'Content-Type': 'application/json',
    //   }),
    // };

    // const body = JSON.stringify({
    //   version: "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
    //   input: {
    //     image: this.stateUrl,
    //     target_age: age,
    //   }
    // });
    
    // //let model = await replicate.models.get('yuval-alaluf/sam');
    //  this.http.post("/v1/predictions", body, httpOptions)
    //   .subscribe(res => {
    //     console.log(res)
    //     this.response = res
    //     let path = "/v1/predictions/"+this.response.id
    //     console.log("path==>",path)
    //     this.isLoading=true;
    //     this.resposeSet(path)
        
    //   })
    
    
   
    // // this.http.get(path,httpOptions).subscribe(res => {
    // //   console.log(res)
    // //   response = res
    
    // // })
    //   //this.imageResponse = this.imageResponse.image
    //   //this.setResultImage(this.imageResponse)
    // };

  //   resposeSet(path) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Authorization': `Token 5804b5bf1a52d95591be094f9c845c0babb2996b`,
  //         'Content-Type': 'application/json',
  //       }),
  //     };
      
  //     let intervalId = setInterval(() => {
  //       this.http.get(path,httpOptions).subscribe(res => {
  //         console.log(res)
  //         this.response = res
  //         if (this.response.status == "succeeded") {
  //           clearInterval(intervalId);
  //           console.log(res)
  //           this.downloadImgRepli(this.response.output)
  //           //this.callAnotherFunction();
  //         }
  //       });
  //     }, 2000);
  //   }






  // async downloadImgRepli(path){
  //   console.log("outputIMG PATH==>",path)
     
  //   const response = await fetch(path);
  //   const blob = await response.blob();
  //   const file = new File([blob], decodeURI(path.split("/").pop()), {
  //     type: blob.type,
  //   });
  //   this.resultFile = file;
  //   console.log("File==>", this.file);
  //   this.isLoading=false;
  // }

  setResultImage(imageResponse: any) {
    this.imageResponse = imageResponse
    console.log("image==>", this.imageResponse)
    var byteString = atob(this.imageResponse);
    var arrayBuffer = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    this.resultFile = new File([arrayBuffer], 'resultfile.png', { type: 'image/png' });
    console.log("result==>", this.resultFile)
  }

  showResultBanner() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.addEventListener('load', () => {
      this.resultImageSrc = reader.result as string;
    });
    //   reader.onload = () => {

    //   this.imageSrc = reader.result as string;

    // }
    reader.readAsDataURL(this.file);
  }
  // this.urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
  // .then(function(file){ console.log(file);});
  // urltoFile(url, filename, mimeType) {
  //   return (fetch(url)
  //     .then(function (res) { return res.arrayBuffer(); })
  //     .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
  //   );
  // }
}
