import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { BoardsService } from '../boards/boards.service';
import { ModalService } from '../shared/modal.service';

import { Board } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  boards?: Board[];
  currentBoard?: Board;
  showNav = false;
  showMenu = false;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.boardsService.boards$.subscribe((boards) => (this.boards = boards));

    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {})),
        map(({ id }) => this.boards?.find((board) => id === board.id))
      )
      .subscribe((board) => {
        this.currentBoard = board;
        this.showNav = false;
        this.showMenu = false;
      });
  }

  onEditClick() {
    console.log('edit');
  }

  onDeleteClick() {
    console.log('delete');
  }

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
}
