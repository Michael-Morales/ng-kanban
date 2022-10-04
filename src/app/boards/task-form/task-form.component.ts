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
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
