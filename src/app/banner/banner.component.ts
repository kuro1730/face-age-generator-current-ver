import { Component, AfterViewInit,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {

  @ViewChild('image') image: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  text = 'Some text to display'
  constructor() { }

  ngAfterViewInit(): void {
    const img = this.image.nativeElement;
    const ctx = this.canvas.nativeElement.getContext('2d');

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(this.text, 10, 30);

      
    };
  }
  

}
