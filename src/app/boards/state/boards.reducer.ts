import { createReducer, on } from '@ngrx/store';

import { fetchData, createBoard, deleteBoard } from './boards.actions';

import { Board } from '../../interfaces';

export interface AppBoardsState {
  boards: Board[];
}

export const initialState: AppBoardsState = {
  boards: [],
};

const generateId = () =>
  (Date.now() * Math.floor(Math.random() * 100)).toString();

export const boardsReducer = createReducer(
  initialState,
  on(fetchData, (_, { boards }) => {
    return { boards };
  }),
  on(createBoard, (state, { board }) => {
    const newColumns = board.columns.map((column) => ({
      ...column,
      id: generateId(),
      tasks: [],
    }));

    return {
      ...state,
      boards: [
        ...state.boards,
        { id: generateId(), name: board.name, columns: newColumns },
      ],
    };
  }),
  on(deleteBoard, (state, { id }) => {
    return {
      ...state,
      boards: state.boards.filter((board) => board.id !== id),
    };
  })
);
