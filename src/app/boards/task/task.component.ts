import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task?: Task;
  @Input() currentColumn = '';
  completedTasks: number | undefined = 0;
  showModal = false;

  constructor() {}

  ngOnInit(): void {
    this.completedTasks = this.task?.subtasks.reduce(
      (acc: number, { isCompleted }: { isCompleted: boolean }) => {
        return isCompleted ? acc + 1 : acc;
      },
      0
    );
  }
}
