import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-navigator-bar',
  templateUrl: './navigator-bar.component.html',
  styleUrl: './navigator-bar.component.scss',
})
export class NavigatorBarComponent {
  @Input() parts: string[];
  @Input() partsNav: number[];
  @Input() routeTarget: string;

  constructor(private router: Router, private route: ActivatedRoute ) { }

  public routeBack(index: number): void {
    if(index + 1 < this.parts.length) {
      const navigateBackCount = this.parts.length - index -1;
      const navigateParams: string[] = [];
      for(let i = 0; i < navigateBackCount; i++) {
        if(this.partsNav && this.partsNav.length > i) {
          for(let j = 0; j < this.partsNav[i]; j++) {
            console.log("test");
            navigateParams.push('..');
          }
        } else {
          navigateParams.push('..');
        }
      }
      
      const navigationExtras: NavigationExtras = { relativeTo: this.route };
      const target = this.routeTarget ? `${navigateParams.join('/')}/${this.routeTarget}`: navigateParams.join('/');
      this.router.navigate([target], navigationExtras);
    }    
  }
}