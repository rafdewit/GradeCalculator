import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid-tile-blob',
  templateUrl: './grid-tile-blob.component.html',
  styleUrls: ['./grid-tile-blob.component.scss']
})
export class GridTileBlobComponent {
  @Input() title: string;
  @Input() clickable: boolean;
  @Input() canEdit: boolean;

  @Input() extraText: string;
  @Input() info: string;
  @Input() infoIcon: string;
  @Input() showMenu: boolean;

  @Input() colorClass: string;
  
  @Output() editRequest = new EventEmitter<void>();
  @Output() clickRequest = new EventEmitter<void>();

  triggerEditRequest(e: MouseEvent) {
    e.stopPropagation();
    this.editRequest.emit();
  }

  emitClickRequest(): void {
    if(this.clickable) {
      this.clickRequest.emit();
    }
  }
}