import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { fetchData, createBoard, deleteBoard } from '../actions/boards.actions';

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

export const boardsReducer = createReducer(
  initialState,
  on(fetchData, (state, { boards, columns, tasks, subtasks }) => {
    return {
      boards: boardAdapter.setAll(boards, state.boards),
      columns: columnAdapter.setAll(columns, state.columns),
      tasks: taskAdapter.setAll(tasks, state.tasks),
      subtasks: subtaskAdapter.setAll(subtasks, state.subtasks),
    };
  }),
  on(createBoard, (state, { board, columns }) => {
    return {
      ...state,
      boards: boardAdapter.addOne(board, state.boards),
      columns:
        columns.length > 0
          ? columnAdapter.addMany(columns, state.columns)
          : state.columns,
    };
  }),
  on(deleteBoard, (state, { id }) => {
    const columnsToDelete = columnSelectors
      .selectAll(state.columns)
      .filter((column) => column.boardId === id)
      .map((column) => column.id.toString());

    const tasks = taskSelectors.selectAll(state.tasks);
    const tasksToDelete: string[] = [];

    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < columnsToDelete.length; j++) {
        if (tasks[i].columnId.toString() === columnsToDelete[j]) {
          tasksToDelete.push(tasks[i].id.toString());
        }
      }
    }

    const subtasks = subtaskSelectors.selectAll(state.subtasks);
    const subtasksToDelete: string[] = [];

    for (let i = 0; i < subtasks.length; i++) {
      for (let j = 0; j < tasksToDelete.length; j++) {
        if (subtasks[i].taskId.toString() === tasksToDelete[j]) {
          subtasksToDelete.push(subtasks[i].id.toString());
        }
      }
    }

    return {
      boards: boardAdapter.removeOne(id.toString(), state.boards),
      columns: columnAdapter.removeMany(columnsToDelete, state.columns),
      tasks: taskAdapter.removeMany(tasksToDelete, state.tasks),
      subtasks: subtaskAdapter.removeMany(subtasksToDelete, state.subtasks),
    };
  })
);

export const boardSelectors = boardAdapter.getSelectors();
export const columnSelectors = columnAdapter.getSelectors();
export const taskSelectors = taskAdapter.getSelectors();
export const subtaskSelectors = subtaskAdapter.getSelectors();
