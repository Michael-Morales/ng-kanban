import { Injectable } from '@angular/core';

import { data } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$ = data;

  constructor() {}
}
