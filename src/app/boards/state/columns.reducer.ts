import { createReducer, on } from '@ngrx/store';

import { Column } from '../../interfaces';

import {
  fetchColumns,
  addColumn,
  deleteColumn,
  updateColumn,
} from './columns.actions';

export const initialState: ReadonlyArray<Column> = [];

export const columnsReducer = createReducer(
  initialState,
  on(fetchColumns, (_, { columns }) => columns),
  on(addColumn, (state, { column }) => [...state, column]),
  on(deleteColumn, (state, { id }) =>
    state.filter((column) => column.id !== id)
  ),
  on(updateColumn, (state, { id, name }) =>
    state.map((column) => (column.id === id ? { ...column, name } : column))
  )
);
