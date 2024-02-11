import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
@Directive({
  selector: '[appProgressBarColor]'
})
export class ProgressBarColor implements OnChanges{
  static counter = 0;
  @Input() appProgressBarColor: string;
  styleEl:HTMLStyleElement = document.createElement('style');
  //generate unique attribule which we will use to minimise the scope of our dynamic style 
  uniqueAttr = `app-progress-bar-color-${ProgressBarColor.counter++}`;
  constructor(private el: ElementRef) { 
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.setAttribute(this.uniqueAttr,'');
    nativeEl.appendChild(this.styleEl);
  }
  ngOnChanges(changes: SimpleChanges): void{
    this.updateColor();
  }
  updateColor(): void{
    // update dynamic style with the uniqueAttr
    this.styleEl.innerText = `
      [${this.uniqueAttr}] .mdc-linear-progress__primary-bar::after { --mdc-linear-progress-active-indicator-color: ${this.appProgressBarColor}; }
    `;
  }
}