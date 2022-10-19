import { Injectable } from '@angular/core';

import { ModalService } from '../shared/modal.service';

import { Board } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  showNav = false;
  showMenu = false;
  showSidebar = false;

  constructor(private modalService: ModalService) {}

  onMenuClick() {
    this.showMenu = !this.showMenu;
    this.showNav = false;
    this.showSidebar = false;
  }

  onNavClick() {
    this.showNav = !this.showNav;
    this.showMenu = false;
  }

  closeMenus() {
    this.showMenu = false;
    this.showNav = false;
    this.showSidebar = false;
  }

  onEditClick(board: Board) {
    this.showMenu = false;
    this.modalService.openModal(board.id + ' board edit');
  }

  onAddBoardClick() {
    this.showNav = false;
    this.modalService.openModal('add-board');
  }

  onAddTaskClick() {
    this.closeMenus();
    this.modalService.openModal('add-task');
  }

  onDeleteClick(board: Board) {
    this.showMenu = false;
    this.modalService.openModal(board.id + ' board delete');
  }

  onShowSidebarClick() {
    this.closeMenus();
    this.showSidebar = true;
  }

  onHideSidebarClick() {
    this.showSidebar = false;
  }
}
