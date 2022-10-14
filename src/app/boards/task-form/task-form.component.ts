import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { selectData } from '../state/boards.selectors';

import { Task, Column } from '../../interfaces';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Input() currentColumn = '';
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
        .select(selectData)
        .pipe(
          map((boards) => boards.find((board) => board.id === params.get('id')))
        )
        .subscribe((board) => (this.columns = board?.columns));
    });

    this.taskForm = this.fb.group({
      subtasks: this.fb.array([]),
      status: [this.currentColumn],
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
