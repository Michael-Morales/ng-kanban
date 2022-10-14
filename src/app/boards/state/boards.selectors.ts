import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppBoardsState } from './boards.reducer';

const selectState = createFeatureSelector<AppBoardsState>('boards');

export const selectData = createSelector(
  selectState,
  ({ boards, columns, tasks, subtasks }) => {
    const populatedTasks = tasks.map((task) => ({
      ...task,
      subtasks: subtasks.filter((subtask) => subtask.taskId === task.id),
    }));

    const populatedColumns = columns.map((column) => ({
      ...column,
      tasks: populatedTasks.filter((task) => task.status === column.name),
    }));

    return boards.map((board) => ({
      ...board,
      columns: populatedColumns.filter((column) => column.boardId === board.id),
    }));
  }
);
