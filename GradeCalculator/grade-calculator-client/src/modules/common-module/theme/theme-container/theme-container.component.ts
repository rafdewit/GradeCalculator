import { Component } from '@angular/core';
import { ThemeSelectorService } from '../theme-selector/theme-selector.service';

@Component({
  selector: 'app-theme-container',
  templateUrl: './theme-container.component.html',
  styleUrls: ['./theme-container.component.scss']
})
export class ThemeContainerComponent {
  constructor(public themeSelectorService: ThemeSelectorService) {}
}
