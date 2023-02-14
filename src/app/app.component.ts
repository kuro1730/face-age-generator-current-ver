import { Component } from '@angular/core';
import { Router ,ActivatedRoute,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'face-age-generator';
  isSideNavCollapsed = false;
  screenWidth = 0;
  currentPath: string;
  hiddenPaths = ['/path/to/hide', '/another/path/to/hide'];
  constructor(private router:Router,private route: ActivatedRoute){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.showSidenav());
  }
  ngOnInit() {
    this.router.navigate([''])

  }
  // ngAfterViewChecked(){
  //   this.currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');
  //   console.log("this.currentPath==>",this.currentPath)
  // }
  onToggleSideNav(data: SideNavToggle): void {
    //console.log(this.router.getCurrentNavigation())
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
   }

   showSidenav() {
    const currentPath = this.router.url;
    console.log(this.router.url)
    return !this.hiddenPaths.includes(currentPath);
  }
}
