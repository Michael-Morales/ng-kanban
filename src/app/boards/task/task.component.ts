import { Component, OnInit, Input } from '@angular/core';

import { ModalService } from 'src/app/shared/modal.service';

import { Task, Column } from '../../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task?: Task;
  @Input() currentColumn?: Column;
  completedTasks: number | undefined = 0;

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.completedTasks = this.task?.subtasks.reduce(
      (acc: number, { isCompleted }: { isCompleted: boolean }) => {
        return isCompleted ? acc + 1 : acc;
      },
      0
    );
  }
}
