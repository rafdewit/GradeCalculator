import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPageComponent { 

}
