import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-section',
  templateUrl: './config-section.component.html',
  styleUrls: ['./config-section.component.scss']
})
export class ConfigSectionComponent implements OnInit {

  files: File[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  

}
