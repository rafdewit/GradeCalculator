import { Component, ContentChildren, HostListener, QueryList } from '@angular/core';
import { GridTileBlobTemplateRefComponent } from '../grid-tile-blob-template-ref/grid-tile-blob-template-ref.component';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent {
  innerWidth: number;

  constructor() {
    this.innerWidth = window.innerWidth;
  }

  @ContentChildren(GridTileBlobTemplateRefComponent) gridTileBlobs: QueryList<GridTileBlobTemplateRefComponent>;

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  public getCols(): number {
    return this.innerWidth < 1100 ? 1 : this.innerWidth < 1650 ? 2 : 3;
  }
}
