import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grid-tile-blob-template-ref',
  templateUrl: './grid-tile-blob-template-ref.component.html',
  styleUrls: ['./grid-tile-blob-template-ref.component.scss']
})
export class GridTileBlobTemplateRefComponent {
  @ViewChild('rootTemplate', {static: true}) root: TemplateRef<unknown>;

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
}