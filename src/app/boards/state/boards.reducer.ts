import { createReducer, on } from '@ngrx/store';

import { fetchData, createBoard } from './boards.actions';

export interface StateBoard {
  id: string;
  name: string;
}

export interface StateColumn {
  id: string;
  boardId: string;
  name: string;
}

export interface StateTask {
  id: string;
  status: string;
  title: string;
  description?: string;
}

export interface StateSubTask {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
}

export interface AppBoardsState {
  boards: StateBoard[];
  columns: StateColumn[];
  tasks: StateTask[];
  subtasks: StateSubTask[];
}

export const initialState: AppBoardsState = {
  boards: [],
  columns: [],
  tasks: [],
  subtasks: [],
};

export const boardsReducer = createReducer(
  initialState,
  on(fetchData, (_, { boards, columns, tasks, subtasks }) => {
    return { boards, columns, tasks, subtasks };
  }),
  on(createBoard, (state, { board }) => {
    const id = (+state.boards[state.boards.length - 1].id + 1).toString();
    const columns = board.columns.map((column) => ({ ...column, boardId: id }));

    return {
      ...state,
      boards: [...state.boards, { id, name: board.name }],
      columns: [...state.columns, ...columns],
    };
  })
);
