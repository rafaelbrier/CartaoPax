import { Component, Input } from '@angular/core';

const html = `
<div class="container">
    <div class="overlay" *ngIf="isLoading">
        <i class="fas fa-sync-alt fa-spin"></i>
    </div>
  <div *ngIf="loadError">
      <i class="fas fa-exclamation-triangle"></i>
      <p>
        Erro ao carregar conteúdo.   
      </p>
      <p>
        Recarregue a página para tentar novamente.
      </p>
  </div>   
</div>
`;
const styles = `
.container {
  max-width: 50%;
  color: #b5b0b0;
  text-align: center;
  transform: translateY(50%);
  -ms-transform: translateY(50%);
  -moz-transform: translateY(50%);
  -webkit-transform: translateY(50%);
  -o-transform: translateY(50%);
}

.overlay {
}

.container i {
  font-size: 72px;
  margin-bottom: 15px;
}

@media screen and (max-width: 768px){
  .container {
      max-width: 100%;
  }      
}
`;
@Component({
  selector: 'app-error-load',
  template: html,
  styles: [styles]
})
export class ErrorLoadComponent {

  @Input()
  isLoading: boolean;

  @Input()
  loadError: boolean;

  constructor() { }

}
