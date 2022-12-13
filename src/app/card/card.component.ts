import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() file:File
  constructor() { }

  ngOnInit(): void {
    this.loadFileImg();
  }
  loadFileImg(){
    var output = document.getElementById('output') as HTMLImageElement | null;
        output.src = URL.createObjectURL(this.file);
        output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
        console.log("=>",output.src);
  }

}
}
