import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeSelectorService } from 'src/modules/common-module/theme/theme-selector/theme-selector.service';
import { IEventClient } from 'src/services/communication/signalr/event-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grade-calculator-client';

  constructor(private router: Router, public gradeEventClient: IEventClient, public themeSelectorService: ThemeSelectorService) {

  }

  public routeToHome(): void {
    this.router.navigateByUrl("");
  }
}
