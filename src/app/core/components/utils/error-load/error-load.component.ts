import { Component, Input } from '@angular/core';

const html = `
<div class="wrapper">
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
.wrapper {
  max-width: 100%;
  color: #b5b0b0;
  text-align: center;
}

:host(app-error-load) {
  margin: 20px auto;
}

.overlay {
}

.wrapper i {
  font-size: 72px;
  margin-bottom: 15px;
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
