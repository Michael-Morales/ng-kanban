import { createReducer, on } from '@ngrx/store';

import { Column } from '../../interfaces';

export const initialState: ReadonlyArray<Column> = [];

export const columnsReducer = createReducer(initialState);
