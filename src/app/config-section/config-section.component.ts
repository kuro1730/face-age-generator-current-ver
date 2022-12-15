import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig} from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';
import { Select,Store } from '@ngxs/store';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-config-section',
  templateUrl: './config-section.component.html',
  styleUrls: ['./config-section.component.scss']
})
export class ConfigSectionComponent implements OnInit{
  ///slider////
  value = 0


  //////////////////////////////////////
  files:File[]=[]
  file:File;

  stateData:any;
  @Select()
    configState$: Observable<configState>;
  constructor() { }
  
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //     //const file = params['file']
    //     console.log(params)
    //     //this.file = file
    //   }
    //     )

    this.configState$.subscribe(file=>{this.stateData=file})
    console.log("ConfigState==>",this.stateData.File);
    this.file=this.stateData.File
    this.files.push(this.file)
  }


}
