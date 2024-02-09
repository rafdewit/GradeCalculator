import { Component } from '@angular/core';
import { AvantTheme } from './avant-theme';
import { ThemeSelectorService } from './theme-selector.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent {
  isOpen = false;
  constructor(public themeSelectorService: ThemeSelectorService) { }

  backdropClick(event: MouseEvent): void {
    event.stopPropagation()
    this.isOpen = false;
  }

  selectTheme(theme: AvantTheme): void {
    this.themeSelectorService.themeChanged(theme);
    // this.isOpen = false;
  }
}
