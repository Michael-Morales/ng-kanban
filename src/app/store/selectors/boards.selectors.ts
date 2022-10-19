import { createSelector, createFeatureSelector } from '@ngrx/store';

import {
  AppBoardsState,
  boardSelectors,
  columnSelectors,
  taskSelectors,
  subtaskSelectors,
} from '../reducers/boards.reducer';

export const selectState = createFeatureSelector<AppBoardsState>('boards');

export const checkBoardsLength = createSelector(selectState, (state) => {
  return boardSelectors.selectTotal(state.boards);
});

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

export const selectBoards = createSelector(selectState, (state) =>
  boardSelectors.selectAll(state.boards)
);

export const selectColumns = createSelector(selectState, (state) =>
  columnSelectors.selectAll(state.columns)
);

export const selectTasks = createSelector(selectState, (state) =>
  taskSelectors.selectAll(state.tasks)
);

export const selectSubtasks = createSelector(selectState, (state) =>
  subtaskSelectors.selectAll(state.subtasks)
);
