import { Component, OnInit, Input } from '@angular/core';

import { SubTask } from '../../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() title = '';
  @Input() subtasks: SubTask[] = [];
  completedTasks: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.completedTasks = this.subtasks?.reduce(
      (acc, { isCompleted }) => (isCompleted ? acc + 1 : acc),
      0
    );
  }
}
