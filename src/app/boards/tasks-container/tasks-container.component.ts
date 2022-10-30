import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Column, Task } from 'src/app/interfaces';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
})
export class TasksContainerComponent implements OnInit {
  @Input() column?: Column;

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Task[]>) {
    if (this.column) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          this.column.tasks,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
}
