import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,
    private sanitizer: DomSanitizer) { }

  openModal(title: string, body: string, modalType: string = "normal", withConfirm: boolean = false) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.withConfirm = withConfirm;
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = this.sanitizer.bypassSecurityTrustHtml(body);
    if(modalType === "image"){
      setTimeout(() => {modalRef.componentInstance.body = body;}, 500)
    }

    return modalRef.result;
  }

  hasOpenModals() {
    return this.modalService.hasOpenModals();
  }

  loaderModal() {
    const modalRef = this.modalService.open(ModalComponent, { keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.modalType = "loader";
  }

  closeAll() {
    this.modalService.dismissAll();
  }
}
