import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges{

  defaultColor = 'rgb(255, 0, 204)';

  @Input('highlight') bgColor = '';

  constructor(private _element: ElementRef) {
    this._element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }


}
