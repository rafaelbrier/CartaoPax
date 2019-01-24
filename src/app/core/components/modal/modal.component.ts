import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  openModal(title: string, body: string, modalType: string = "normal", withConfirm: boolean = false) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.withConfirm = withConfirm;
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;

    return modalRef.result;
  }
}
