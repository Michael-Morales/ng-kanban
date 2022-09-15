import { Component, OnInit, Input } from '@angular/core';

import { Column, Task } from '../../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task?: Task;
  @Input() columns?: Column[];
  @Input() currentColumn = '';
  completedTasks: number | undefined = 0;
  showModal = false;

  constructor() {}

  ngOnInit(): void {
    this.completedTasks = this.task?.subtasks?.reduce(
      (acc, { isCompleted }) => (isCompleted ? acc + 1 : acc),
      0
    );
  }
}
