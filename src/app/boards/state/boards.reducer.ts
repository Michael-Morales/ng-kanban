import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { fetchData } from './boards.actions';

import { IBoard, IColumn, ITask, ISubTask } from '../../interfaces';

export interface BoardState extends EntityState<IBoard> {}
export interface ColumnState extends EntityState<IColumn> {}
export interface TaskState extends EntityState<ITask> {}
export interface SubTaskState extends EntityState<ISubTask> {}

export const boardAdapter: EntityAdapter<IBoard> =
  createEntityAdapter<IBoard>();
export const columnAdapter: EntityAdapter<IColumn> =
  createEntityAdapter<IColumn>();
export const taskAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>();
export const subtaskAdapter: EntityAdapter<ISubTask> =
  createEntityAdapter<ISubTask>();

export interface AppBoardsState {
  boards: EntityState<IBoard>;
  columns: EntityState<IColumn>;
  tasks: EntityState<ITask>;
  subtasks: EntityState<ISubTask>;
}

export const initialState: AppBoardsState = {
  boards: boardAdapter.getInitialState(),
  columns: columnAdapter.getInitialState(),
  tasks: taskAdapter.getInitialState(),
  subtasks: subtaskAdapter.getInitialState(),
};

const generateId = () => Date.now() * Math.floor(Math.random() * 100);

export const boardsReducer = createReducer(
  initialState,
  on(fetchData, (state, { boards, columns, tasks, subtasks }) => {
    return {
      boards: boardAdapter.setAll(boards, state.boards),
      columns: columnAdapter.setAll(columns, state.columns),
      tasks: taskAdapter.setAll(tasks, state.tasks),
      subtasks: subtaskAdapter.setAll(subtasks, state.subtasks),
    };
  })
);

export const boardSelectors = boardAdapter.getSelectors();
export const columnSelectors = columnAdapter.getSelectors();
export const taskSelectors = taskAdapter.getSelectors();
export const subtaskSelectors = subtaskAdapter.getSelectors();
