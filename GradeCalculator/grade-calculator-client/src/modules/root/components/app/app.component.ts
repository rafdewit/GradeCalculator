import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ThemeSelectorService } from 'src/modules/common-module/theme/theme-selector/theme-selector.service';
import { IStudentCollectionClient } from 'src/services/communication/api/base/student-collection-client';
import { GradeHubClient } from 'src/services/communication/signalr/grade-hub.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grade-calculator-client';

  constructor(private router: Router, public gradeHubClient: GradeHubClient, public themeSelectorService: ThemeSelectorService, private client: IStudentCollectionClient) {
    console.log("hello2");
  }

  public routeToHome(): void {
    this.router.navigateByUrl("");
    firstValueFrom(this.client.getAllClasses()).then(v => console.log(v));
  }

}
