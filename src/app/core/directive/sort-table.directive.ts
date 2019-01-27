import { Directive, HostBinding, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSortTable]'
})
export class SortTableDirective {
  //  The element needs and Id equals 
  // to the Sort Element in the database and equals to orderBy

  protected elementId: string;
  protected _elementClass: string[] = [];

  @Input()
  sort: string[] = [];

  @HostBinding('class')
  get elementClass() {
    return this._elementClass.join(' ');
  }
  set(val: string) {
    this._elementClass = val.split(' ');
  }
  // protected _elementClass: string;




  constructor(private elementRef: ElementRef) {
    this.elementId = this.elementRef.nativeElement.getAttribute('id');
    let _class = this.elementRef.nativeElement.getAttribute('class');

    if (_class) {
      this.set(_class);
    }

    this.setArrow(true);
  }

  ngOnChanges() {
    this.setArrow(false);
  }

  setArrow(firstTime: boolean): void {
    if (this.sort[0] === this.elementId) {
      this._elementClass.pop();
      if (this.sort[1] === 'asc') {
        this._elementClass.push('arrow-up');
      } else {
        this._elementClass.push('arrow-down');
      }
    } else {
      if(!firstTime) this._elementClass.pop();
      this._elementClass.push('arrow-right');
    }
  }

}
