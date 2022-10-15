import { createSelector, createFeatureSelector } from '@ngrx/store';

import {
  AppBoardsState,
  boardSelectors,
  columnSelectors,
  taskSelectors,
  subtaskSelectors,
} from './boards.reducer';

export const selectState = createFeatureSelector<AppBoardsState>('boards');

export const selectPopulatedTasks = createSelector(selectState, (state) => {
  const subtasks = subtaskSelectors.selectAll(state.subtasks);
  const tasks = taskSelectors.selectAll(state.tasks);

  return tasks.map((task) => ({
    ...task,
    subtasks: subtasks.filter((subtask) => subtask.taskId === task.id),
  }));
});

export const selectPopulatedColumns = createSelector(
  selectState,
  selectPopulatedTasks,
  (state, tasks) => {
    const columns = columnSelectors.selectAll(state.columns);

    return columns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.columnId === column.id),
    }));
  }
);

export const selectAllBoards = createSelector(
  selectState,
  selectPopulatedColumns,
  (state, columns) => {
    const boards = boardSelectors.selectAll(state.boards);

    return boards.map((board) => ({
      ...board,
      columns: columns.filter((column) => column.boardId === board.id),
    }));
  }
);
