import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { moveItemInState } from '../../store/actions/boards.actions';

import { Column, Task } from 'src/app/interfaces';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
})
export class TasksContainerComponent implements OnInit {
  @Input() column?: Column;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Task[]>) {
    if (this.column) {
      const targetColumnId = this.column.id;

      if (event.previousContainer === event.container) {
        moveItemInArray(
          this.column.tasks,
          event.previousIndex,
          event.currentIndex
        );

        const rearrangedTasks = event.container.data.map(
          ({ id, columnId, description, title }, i) => ({
            id,
            columnId,
            description,
            position: i,
            title,
          })
        );

        this.store.dispatch(moveItemInState({ tasks: rearrangedTasks }));
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

        const previousContainer = event.previousContainer.data.map(
          ({ id, columnId, title, description }, i) => ({
            id,
            columnId,
            description,
            title,
            position: i,
          })
        );
        const newContainer = event.container.data.map(
          ({ id, title, description }, i) => ({
            id,
            columnId: targetColumnId,
            title,
            description,
            position: i,
          })
        );

        this.store.dispatch(
          moveItemInState({ tasks: [...previousContainer, ...newContainer] })
        );
      }
    }
  }
}
