import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GradeHubClient } from 'src/services/signalr/grade-hub.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grade-calculator-client';

  constructor(private router: Router, public gradeHubClient: GradeHubClient) {
  }

  public routeToHome(): void {
    this.router.navigateByUrl("");
  }
}
