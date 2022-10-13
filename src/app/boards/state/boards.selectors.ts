import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Board, Column, Task, SubTask } from '../../interfaces';

export const selectBoards =
  createFeatureSelector<ReadonlyArray<Board>>('boards');
export const selectColumns =
  createFeatureSelector<ReadonlyArray<Column>>('columns');
export const selectTasks = createFeatureSelector<ReadonlyArray<Task>>('tasks');
export const selectSubtasks =
  createFeatureSelector<ReadonlyArray<SubTask>>('subtasks');

export const selectPopulatedTasks = createSelector(
  selectTasks,
  selectSubtasks,
  (tasks, subtasks) => {
    return tasks.map((task) => ({
      ...task,
      subtasks: subtasks.filter((subtask) => task.id === subtask.taskId),
    }));
  }
);

export const selectPopulatedColumns = createSelector(
  selectColumns,
  selectPopulatedTasks,
  (columns, tasks) => {
    return columns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.status === column.name),
    }));
  }
);

export const selectPopulatedBoards = createSelector(
  selectBoards,
  selectPopulatedColumns,
  (boards, columns) => {
    return boards.map((board) => ({
      ...board,
      columns: columns.filter((column) => board.id === column.boardId),
    }));
  }
);
