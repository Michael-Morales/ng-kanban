import { Injectable } from '@angular/core';
import { BehaviorSubject, map, zip } from 'rxjs';

import { Board, Column, Task, SubTask } from '../interfaces';

import { boards, columns, tasks, subtasks } from './mock-data';

interface CreateBoardParam {
  name: string;
  columns: Column[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>(boards);
  columns$: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>(columns);
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);
  subtasks$: BehaviorSubject<SubTask[]> = new BehaviorSubject<SubTask[]>(
    subtasks
  );

  constructor() {}

  getBoardById(id: string | null | undefined) {
    return zip(this.boards$, this.columns$).pipe(
      map(([boards, columns]) => {
        const board = boards.find((board) => board.id === id);

        if (board) {
          return {
            ...board,
            columns: columns.filter((column) => column.boardId === board.id),
          };
        }

        return undefined;
      })
    );
  }

  getBoardColumns(id: string | null | undefined) {
    return this.columns$.pipe(
      map((columns) => columns.filter((column) => column.boardId === id))
    );
  }

  createBoard(board: CreateBoardParam) {
    const currentData = this.boards$.value;
    const newData = [
      ...currentData,
      { ...board, id: `${currentData.length + 1}` },
    ];

    this.boards$.next(newData);

    return this.boards$.value.length;
  }

  deleteBoard(id: string) {
    const currentData = this.boards$.value;

    const newData = currentData.filter((board) => board.id !== id);

    this.boards$.next(newData);
  }

  updateBoard(val: CreateBoardParam, id: string) {
    const currentData = this.boards$.value;
    const { name, columns } = val;

    const newData = currentData.map((board) => {
      if (board.id === id) {
        const updatedColumns = board.columns
          .filter((column) => columns.find((col) => col.id === column.id))
          .map((column) => {
            const updatedCol = columns.find((col) => col.id === column.id);

            if (updatedCol) {
              return { ...column, name: updatedCol.name };
            }

            return column;
          });

        return { ...board, name, columns: updatedColumns };
      }

      return board;
    });

    this.boards$.next(newData);
  }
}
