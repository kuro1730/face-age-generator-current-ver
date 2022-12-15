import { Component, OnInit,Input, } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig} from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';
import { Select,Store } from '@ngxs/store';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {
  file:File;
  text : String;
  stateData:any;
  @Select()
    configState$: Observable<configState>;
  constructor(private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //     //const file = params['file']
    //     console.log(params)
    //     //this.file = file
    //   }
    //     )
    this.text = "Heelo"
    this.configState$.subscribe(file=>{this.stateData=file})
    console.log("ConfigState==>",this.stateData.File);
    this.file=this.stateData.File
  //   var output = document.getElementById('outputConfig') as HTMLImageElement ;
  //   output.src = URL.createObjectURL(this.stateData.File);
  //   output.onload = function() {
  //     URL.revokeObjectURL(output.src) // free memory
          
  //  }
    // let base64  = <string>this.stateData.File
    // let type = this.stateData.type
    // //console.log(type)
    // base64 = atob(base64)
    // let file = new Blob([base64], {type: type});
    //  var output = document.getElementById('outputConfig') as HTMLImageElement ;
    
    //     output.src = URL.createObjectURL(file);
    //     output.onload = function() {
    //     URL.revokeObjectURL(output.src) // free memory
        
    //     }
    //     console.log("=>",output.src);
        //var fileUrl = URL.createObjectURL(file);
        //document.getElementById("myImage").src = fileUrl;
    
       

  }
  // ngOnChange(){
  //   this.loadFileImg();
  // }
 



}
