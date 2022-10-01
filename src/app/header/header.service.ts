import { Injectable } from '@angular/core';

import { ModalService } from '../shared/modal.service';

import { Board } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  showNav = false;
  showMenu = false;

  constructor(private modalService: ModalService) {}

  onMenuClick() {
    this.showMenu = !this.showMenu;
    this.showNav = false;
    this.modalService.closeModal();
  }

  onNavClick() {
    this.showNav = !this.showNav;
    this.showMenu = false;
    this.modalService.closeModal();
  }

  closeMenus() {
    this.showMenu = false;
    this.showNav = false;
  }

  onEditClick(board: Board) {
    this.showMenu = false;
    this.modalService.openModal(board.id + ' edit');
  }

  onDeleteClick(board: Board) {
    this.showMenu = false;
    this.modalService.openModal(board.id + ' delete');
  }
}
