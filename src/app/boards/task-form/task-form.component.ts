import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BoardsService } from '../boards.service';

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
  columns?: Column[];
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id }) => (this.columns = this.boardsService.getBoardColumns(id))
    );

    this.taskForm = this.fb.group({
      subtasks: this.fb.array([]),
      status: [this.currentColumn],
    });

    const formArray = this.taskForm.get('subtasks') as FormArray;

    this.task?.subtasks.forEach((subtask) => {
      formArray.push(
        this.fb.group({
          title: this.fb.control(subtask.title),
          isCompleted: this.fb.control(subtask.isCompleted),
        })
      );
    });
  }

  get subtasks() {
    return this.taskForm.controls['subtasks'] as FormArray;
  }
}
