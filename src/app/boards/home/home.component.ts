import { Component, OnInit } from '@angular/core';

import { BoardsService } from '../boards.service';
import { HeaderService } from 'src/app/header/header.service';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];

  constructor(
    private boardsService: BoardsService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.boardsService.boards$.subscribe((boards) => (this.boards = boards));
  }

  dismissHeaderMenu() {
    if (this.headerService.showMenu || this.headerService.showNav) {
      this.headerService.closeMenus();
    }
  }
}
