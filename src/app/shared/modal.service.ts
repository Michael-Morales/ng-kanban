import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalId: string = '';

  constructor() {}

  get modal() {
    return this.modalId;
  }

  openModal(id: string) {
    this.modalId = id;
  }

  closeModal() {
    this.modalId = '';
  }
}
