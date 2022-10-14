import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppBoardsState } from './boards.reducer';

export const selectBoards = createFeatureSelector<AppBoardsState>('boards');

export const selectAllBoards = createSelector(
  selectBoards,
  (state) => state.boards
);
