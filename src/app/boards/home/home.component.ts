import { Component, OnInit } from '@angular/core';

import { BoardsService } from '../boards.service';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boards = this.boardsService.boards$;
  }
}
