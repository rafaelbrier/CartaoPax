import { Component, Input } from '@angular/core';

@Component({
  selector: 'image',
  template: `
      <img  [lazyLoad]="imgSrc" [defaultImage]="defaultImage" [errorImage]="errorImage" 
      [ngStyle]="{'height': height, 'width': width}">
  `
})
export class ImgLazyComponent {
  @Input()  imgSrc: string;

  @Input() height: string;

  @Input() width: string;

  defaultImage: string = '../../assets/images/ripple-loader.svg';
  errorImage: string = '../../assets/images/notfound.png';
  offset = 100;
}
