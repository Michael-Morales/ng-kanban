import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

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
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      subtasks: this.fb.array([]),
      status: [''],
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

    this.completedTasks = formArray.value.reduce(
      (acc: number, { isCompleted }: { isCompleted: boolean }) => {
        return isCompleted ? acc + 1 : acc;
      },
      0
    );
  }

  get subtasks() {
    return this.taskForm.controls['subtasks'] as FormArray;
  }
}
