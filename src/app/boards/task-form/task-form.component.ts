import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { toggleSubtask } from 'src/app/store/actions/boards.actions';

import { Task, Column, ISubTask } from '../../interfaces';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Input() currentColumn?: Column;
  @Input() completedTasks?: number;
  taskForm!: FormGroup;
  columns?: Column[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store
        .select(selectAllBoards)
        .pipe(
          map((boards) =>
            boards.find((board) => board.id.toString() === params.get('id'))
          )
        )
        .subscribe((board) => (this.columns = board?.columns));
    });

    this.taskForm = this.fb.group({
      subtasks: this.fb.array([]),
      columnId: [this.currentColumn?.id],
    });

    this.task?.subtasks.forEach((subtask) => {
      this.subtasks.push(
        this.fb.group({
          id: [subtask.id, Validators.required],
          taskId: [this.task?.id, Validators.required],
          title: [subtask.title, Validators.required],
          isCompleted: [subtask.isCompleted, Validators.required],
        })
      );
    });
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  onSelect(id: number) {
    const currentSubtaskStatus = this.subtasks.value.find(
      (subtask: ISubTask) => subtask.id === id
    ).isCompleted;

    this.store.dispatch(
      toggleSubtask({
        update: { id, changes: { isCompleted: !currentSubtaskStatus } },
      })
    );
  }
}
