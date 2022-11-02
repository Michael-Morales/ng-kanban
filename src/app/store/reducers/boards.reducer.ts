import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  fetchData,
  createBoard,
  deleteBoard,
  updateBoard,
  createColumn,
  createTask,
  deleteTask,
  toggleSubtask,
  updateTaskColumn,
  deleteColumn,
  updateTask,
  deleteSubtask,
  moveItemInState,
} from '../actions/boards.actions';

import { IBoard, IColumn, ITask, ISubTask } from '../../interfaces';

export interface BoardState extends EntityState<IBoard> {}
export interface ColumnState extends EntityState<IColumn> {}
export interface TaskState extends EntityState<ITask> {}
export interface SubTaskState extends EntityState<ISubTask> {}

export const boardAdapter: EntityAdapter<IBoard> =
  createEntityAdapter<IBoard>();
export const columnAdapter: EntityAdapter<IColumn> =
  createEntityAdapter<IColumn>();
export const taskAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
  sortComparer: (a, b) => a.position - b.position,
});
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

export const generateId = (): number => {
  return Math.floor(Date.now() * Math.random());
};

const getNewPosition = (state: AppBoardsState, newColId?: number): number => {
  const tasks = taskSelectors
    .selectAll(state.tasks)
    .filter(({ columnId }) => columnId === newColId);

  const position =
    tasks.length === 0 ? 0 : tasks[tasks.length - 1].position + 1;

  return position;
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
      columns: !columns.length
        ? state.columns
        : columnAdapter.addMany(columns, state.columns),
    };
  }),
  on(deleteBoard, (state, { id }) => {
    const columnsToDelete: string[] = columnSelectors
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
  }),
  on(updateBoard, (state, { board, columns }) => {
    return {
      ...state,
      boards: boardAdapter.updateOne(board, state.boards),
      columns: columnAdapter.upsertMany(columns, state.columns),
    };
  }),
  on(createColumn, (state, { column }) => {
    return { ...state, columns: columnAdapter.addOne(column, state.columns) };
  }),
  on(deleteColumn, (state, { id }) => {
    const tasksToDelete: string[] = taskSelectors
      .selectAll(state.tasks)
      .filter((task) => task.columnId === id)
      .map((task) => task.id.toString());

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
      ...state,
      columns: columnAdapter.removeOne(id.toString(), state.columns),
      tasks: taskAdapter.removeMany(tasksToDelete, state.tasks),
      subtasks: subtaskAdapter.removeMany(subtasksToDelete, state.subtasks),
    };
  }),
  on(createTask, (state, { task, subtasks }) => {
    const newTask = { ...task, position: getNewPosition(state, task.columnId) };

    return {
      ...state,
      tasks: taskAdapter.addOne(newTask, state.tasks),
      subtasks: !subtasks.length
        ? state.subtasks
        : subtaskAdapter.addMany(subtasks, state.subtasks),
    };
  }),
  on(deleteTask, (state, { id }) => {
    const subtasksToDelete = subtaskSelectors
      .selectAll(state.subtasks)
      .filter((subtask) => subtask.taskId === id)
      .map((subtask) => subtask.id.toString());

    return {
      ...state,
      tasks: taskAdapter.removeOne(id.toString(), state.tasks),
      subtasks: subtaskAdapter.removeMany(subtasksToDelete, state.subtasks),
    };
  }),
  on(updateTask, (state, { task, subtasks }) => {
    const previousTask = taskSelectors
      .selectAll(state.tasks)
      .find(({ id }) => id === task.id);

    const updatedTask = {
      ...task,
      changes:
        previousTask?.columnId === task.changes.columnId
          ? task.changes
          : {
              ...task.changes,
              position: getNewPosition(state, task.changes.columnId),
            },
    };

    return {
      ...state,
      tasks: taskAdapter.updateOne(updatedTask, state.tasks),
      subtasks: subtaskAdapter.upsertMany(subtasks, state.subtasks),
    };
  }),
  on(toggleSubtask, (state, { update }) => {
    return {
      ...state,
      subtasks: subtaskAdapter.updateOne(update, state.subtasks),
    };
  }),
  on(deleteSubtask, (state, { id }) => {
    return {
      ...state,
      subtasks: subtaskAdapter.removeOne(id.toString(), state.subtasks),
    };
  }),
  on(updateTaskColumn, (state, { update }) => {
    const updatedTask = {
      ...update,
      changes: {
        ...update.changes,
        position: getNewPosition(state, update.changes.columnId),
      },
    };

    return { ...state, tasks: taskAdapter.updateOne(updatedTask, state.tasks) };
  }),
  on(moveItemInState, (state, { tasks }) => {
    return { ...state, tasks: taskAdapter.setMany(tasks, state.tasks) };
  })
);

export const boardSelectors = boardAdapter.getSelectors();
export const columnSelectors = columnAdapter.getSelectors();
export const taskSelectors = taskAdapter.getSelectors();
export const subtaskSelectors = subtaskAdapter.getSelectors();
