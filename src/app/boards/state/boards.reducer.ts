import { createReducer, on } from '@ngrx/store';

import { Board } from '../../interfaces';

import {
  fetchBoards,
  addBoard,
  deleteBoard,
  updateBoard,
} from './boards.actions';

export const initialState: ReadonlyArray<Board> = [];

export const boardsReducer = createReducer(
  initialState,
  on(fetchBoards, (_, { boards }) => boards),
  on(addBoard, (state, { board }) => [...state, board]),
  on(deleteBoard, (state, { id }) => state.filter((board) => board.id !== id)),
  on(updateBoard, (state, { id, name }) =>
    state.map((board) => (board.id === id ? { ...board, name } : board))
  )
);
