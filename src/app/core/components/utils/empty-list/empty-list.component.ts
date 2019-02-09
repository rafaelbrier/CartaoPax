import { Component, Input } from '@angular/core';

const html = `
<div class="wrapper" *ngIf="show">
  <div>
      <i class="fas fa-search"></i>
      <p>
       A lista está vazia.  
      </p>
  </div>   
</div>
`;
const styles = `
.wrapper {
  max-width: 100%;
  color: #b5b0b0;
  text-align: center;
}

:host(app-empty-list) {
  margin: 20px auto;
}

.wrapper i {
  color: white;
  background-color: #e2e2e2;
  padding: 25px;
  border-radius: 20%;
  font-size: 72px;
  margin-bottom: 15px;
}

.wrapper p {
  font-size: 20px;
  font-weight: bold;
  }
`;
@Component({
  selector: 'app-empty-list',
  template: html,
  styles: [styles]
})
export class EmptyListComponent {

  @Input()
  show: boolean = false;
  
  constructor() { }

}
