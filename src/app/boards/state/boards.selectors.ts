import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Board, Column } from '../../interfaces';

export const selectBoards =
  createFeatureSelector<ReadonlyArray<Board>>('boards');
export const selecColumns =
  createFeatureSelector<ReadonlyArray<Column>>('columns');

export const selectGetBoards = createSelector(
  selectBoards,
  selecColumns,
  (boards, columns) => {
    return boards.map((board) => ({
      ...board,
      columns: columns.filter((column) => board.id === column.boardId),
    }));
  }
);
