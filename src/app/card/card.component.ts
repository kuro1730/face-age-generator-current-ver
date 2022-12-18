import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig} from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() file:any
  constructor(private store: Store) { }
  imageSrc:String
  ngOnInit(): void {
    console.log("cardFile==>",this.file)
    this.loadFileImg();
  }
  loadFileImg(){
    // let output = document.getElementById('output') as HTMLImageElement | null;
    //     output.src = URL.createObjectURL(this.file);
    //     output.onload = function() {
    //     URL.revokeObjectURL(output.src) // free memory
        
    //   }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.addEventListener('load', () => {
      this.imageSrc = reader.result as string;
    });
  //   reader.onload = () => {
   
  //   this.imageSrc = reader.result as string;
  
  // }
    reader.readAsDataURL(this.file);
}
}
