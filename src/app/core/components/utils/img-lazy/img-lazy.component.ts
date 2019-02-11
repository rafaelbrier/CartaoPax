import { Component, Input } from '@angular/core';

@Component({
  selector: 'image',
  template: `
      <img  [lazyLoad]="imgSrc" [defaultImage]="defaultImage" [errorImage]="errorImage" 
      [ngStyle]="styleObject()"
      >
  `
})
export class ImgLazyComponent {
  @Input() imgSrc: string;

  @Input() height: string;

  @Input() width: string;

  @Input() style: any = {};

  styleObject(): Object {
    if (this.height || this.width || this.style) {
        return Object.assign({}, { 
          'height': this.height ? this.height : '', 'width': this.width ? this.width : ''
         }, this.style);
    } else {
      return {};
    }
  };

  defaultImage: string = '../../assets/images/ripple-loader.svg';
  errorImage: string = '../../assets/images/notfound.png';
  offset = 100;
}

