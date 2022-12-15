import { AfterViewChecked, AfterViewInit, Component, OnInit ,OnChanges} from '@angular/core';
import { Select,Store } from "@ngxs/store";
import { Observable } from 'rxjs';
import { first } from "rxjs/operators";
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig} from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';
import { Router } from '@angular/router';
@Component({
    selector: 'upload-manager',
    templateUrl: './upload-manager.component.html',
    styleUrls: ['./upload-manager.component.css']
})


export class UploadManagerComponent implements OnInit,AfterViewChecked {
    toggleUpload:boolean ;
    uploadFinish:boolean=false ; 
    isHovering: boolean;
    files: File[] = [];
    file: File=null;
    configStore :Observable<any>;
    stateFile: File;
    stateData: any;
    @Select()
    configState$: Observable<configState>;
 
    constructor(
       private store: Store,
       private router:Router
        )
         { }

    ngOnInit(): void {
    }
    
    ngAfterViewChecked(){
    
        if(this.uploadFinish==true)
        this.router.navigate(['/config'] );
    }
    
    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    // onDrop(event ) {
    //     for (let i = 0; i < (event.target as HTMLInputElement).files.length; i++) {
    //         console.log('uploadManager adding file: ', (event.target as HTMLInputElement).files.item(i));
    //         this.files.push((event.target as HTMLInputElement).files.item(i));
            
    //     }
    // }
    onDrop(event) {
        for (let i = 0; i < event.length; i++) {
            console.log('uploadManager adding file: ', event.item(i));
            this.files.push(event.item(i));
            this.file= this.files[i]
            
            this.store.dispatch(new ConfigState.updateState({File: this.file}))
            this.configState$.subscribe(file=>{this.stateData=file})
            console.log("ConfigState==>",this.stateData.File);
            this.file=this.stateData.File
            if(this.file===this.files[i]&&this.file==this.files[i]){console.log("this File is Equal i sus")}
        }
        
        
    }
    removeFile() {
        // Delete the item from fileNames list
        // delete file from FileList
        this.files = [];
        this.store.dispatch(new ConfigState.resetState())
       }
    
    // rotateImage(){
    //     let reader = new FileReader();
    //     let img = new Image;
    //     reader.readAsDataURL(this.files[0]);
    //     reader.onload=(e)=>{let log = reader.result as string
            
    //         img.src=log;
    //         console.log("IMG=>",img);
    //     };
    //     img.style.transform ="rotate(90deg)";
        
    //     // let rotatedFile = this.dataURLtoFile(img.src,this.files[0].name);
    //     // // this.files=[];
    //     // // this.files.push(rotatedFile);
        
    //     // let reader = new FileReader();
    //     // reader.readAsDataURL(this.files[0]);
    //     // let img = new Image;
    //     // img.src = reader.result.toString();
    //     // let canvas = document.createElement('canvas');
    //     // canvas.width = img.width;
    //     // canvas.height = img.height;
    //     // let canvastx = canvas.getContext("2d");
    //     // canvastx.save() ;
    //     // canvastx.translate ( img.width / 2, img.height / 2) ;
    //     // canvastx.rotate(90);
    //     // let imgData = canvastx.createImageData(img.width, img.height);
    //     // canvastx.putImageData(imgData);
    // }

    // dataURLtoFile(dataurl, filename) {
    //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //         while(n--){
    //             u8arr[n] = bstr.charCodeAt(n);
    //         }
    //         return new File([u8arr], filename, {type:mime});
    //     }
    // getDataFromState(){
    //     this.configStore = this.store.select(state => state.configState)
    //     this.stateFile = ConfigState;
    //     //console.log(this.stateFile);
    // }
}
