import { createSelector, createFeatureSelector } from '@ngrx/store';

import {
  AppBoardsState,
  boardSelectors,
  columnSelectors,
  taskSelectors,
  subtaskSelectors,
} from './boards.reducer';

export const selectState = createFeatureSelector<AppBoardsState>('boards');

export const selectAllBoards = createSelector(selectState, (state) => {
  const subtasks = subtaskSelectors.selectAll(state.subtasks);
  const tasks = taskSelectors.selectAll(state.tasks);
  const columns = columnSelectors.selectAll(state.columns);
  const boards = boardSelectors.selectAll(state.boards);

  const populatedTasks = tasks.map((task) => ({
    ...task,
    subtasks: subtasks.filter((subtask) => subtask.taskId === task.id),
  }));

  const populatedColumns = columns.map((column) => ({
    ...column,
    tasks: populatedTasks.filter((task) => task.columnId === column.id),
  }));

  return boards.map((board) => ({
    ...board,
    columns: populatedColumns.filter((column) => column.boardId === board.id),
  }));
});
