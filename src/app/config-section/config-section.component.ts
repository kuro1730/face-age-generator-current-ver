import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig } from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';
import { Select, Store } from '@ngxs/store';
import { NgModel } from '@angular/forms';
import { Options } from "@angular-slider/ngx-slider";
import { HttpClient, HttpParams } from '@angular/common/http';
import { async } from '@firebase/util';

@Component({
  selector: 'app-config-section',
  templateUrl: './config-section.component.html',
  styleUrls: ['./config-section.component.scss']
})
export class ConfigSectionComponent implements OnInit, AfterViewInit {
  ///slider////
  
  imageResponse: any
  age: number = 0;
  eyeGlasses: boolean;
  smile: boolean;
  options: Options = {
    floor: -3,
    ceil: 3
  };

  //////////////////////////////////////
  files: File[] = [];
  file: File;
  resultFile:File;
  stateData: any;
  @Select()
  configState$: Observable<configState>;
  constructor(private http: HttpClient) { }
  ngAfterViewInit() {
 
  }
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //     //const file = params['file']
    //     console.log(params)
    //     //this.file = file
    //   }
    //     )

    this.configState$.subscribe(file => { this.stateData = file })
    console.log("ConfigState==>", this.stateData.File);
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
      .append('pose', 0)
      .append('smile', smile);
    console.log("params=>" + params)
    this.http.post("http://c139-34-124-141-80.ngrok.io/getImgAttr?" + params, null)
      .subscribe(response => {
        console.log(response)
        this.imageResponse = response
        this.imageResponse = this.imageResponse.image

        this.setResultImage(this.imageResponse)
      })
      
      //this.section.nativeElement.scrollIntoView({ behavior: 'smooth' });
    
        
      
      
    // fetch('http://6c45-34-143-237-120.ngrok.io/getImgAttr?'+"num_sample=1&noise_seed=0"+"&age="+this.age+"&eyeglasses="+eyeGlasses+"&gender=0"+"&pose=0"+"&smile="+smile).then(response => { console.log(response.json())});
  }
  setResultImage(imageResponse: any) {
    
    this.imageResponse = imageResponse
    console.log("image==>", this.imageResponse)
    // this.urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
    // .then(function(file){ console.log(file);});
    var byteString = atob(this.imageResponse);
    var arrayBuffer = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    this.resultFile = new File([arrayBuffer], 'resultfile.png', {type: 'image/png'});
    console.log("result==>",this.resultFile)
  }

  

  // urltoFile(url, filename, mimeType) {
  //   return (fetch(url)
  //     .then(function (res) { return res.arrayBuffer(); })
  //     .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
  //   );
  // }
}
