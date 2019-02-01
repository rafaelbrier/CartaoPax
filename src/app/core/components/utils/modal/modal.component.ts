import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  openModal(title: string, body: string, modalType: string = "normal", withConfirm: boolean = false) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.withConfirm = withConfirm;
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.title = title;

    if (modalType === "image") {
      setTimeout(() => {
        modalRef.componentInstance.body = body;
      }, 1000);
    } else {
      modalRef.componentInstance.body = body;
    }

    return modalRef.result;
  }

  hasOpenModals() {
    return this.modalService.hasOpenModals();
  }

  loaderModal() {
    const modalRef = this.modalService.open(ModalComponent, {keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.modalType = "loader";
  }

  closeAll() {
    this.modalService.dismissAll();
  }
}
