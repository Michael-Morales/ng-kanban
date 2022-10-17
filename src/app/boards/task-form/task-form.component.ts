import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { Task, Column } from '../../interfaces';

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
          title: this.fb.control(subtask.title),
          isCompleted: this.fb.control(subtask.isCompleted),
        })
      );
    });
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }
}
