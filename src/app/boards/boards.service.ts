import { Injectable } from '@angular/core';

import { Board, Column } from '../interfaces';

import { data } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: Board[] = data;

  constructor() {}

  getBoardById(id: string): Board | undefined {
    return this.boards$.find((board) => board.id === id);
  }

  getBoardColumns(id: string): Column[] | undefined {
    return this.getBoardById(id)?.columns;
  }
}
