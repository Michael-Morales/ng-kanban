import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { ModalService } from '../../shared/modal.service';

import { deleteTask } from '../../store/actions/boards.actions';

import {
  selectTasks,
  selectSubtasks,
} from 'src/app/store/selectors/boards.selectors';

import { ITask, ISubTask } from '../../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() taskId?: number;
  @Input() currentColumnId?: number;
  task$?: ITask;
  subtasks$?: ISubTask[];
  completedTasks: number = 0;

  constructor(public modalService: ModalService, private store: Store) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectTasks),
      this.store.select(selectSubtasks),
    ])
      .pipe(
        map(([tasks, subtasks]): [ITask | undefined, ISubTask[]] => [
          tasks.find((task) => task.id === this.taskId),
          subtasks.filter((subtask) => subtask.taskId === this.taskId),
        ])
      )
      .subscribe(([task, subtasks]) => {
        this.task$ = task;
        this.subtasks$ = subtasks;
        this.completedTasks = subtasks.reduce(
          (acc, cur) => (cur.isCompleted ? acc + 1 : acc),
          0
        );
      });
  }

  onDelete() {
    if (this.taskId) {
      this.store.dispatch(deleteTask({ id: this.taskId }));
      this.modalService.closeModal();
    }
  }
}
