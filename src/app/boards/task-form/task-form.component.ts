import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest, Observable } from 'rxjs';

import { selectColumns } from '../../store/selectors/boards.selectors';

import {
  toggleSubtask,
  updateTaskColumn,
} from 'src/app/store/actions/boards.actions';

import { ITask, IColumn, ISubTask } from '../../interfaces';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  @Input() currentTask?: ITask;
  @Input() currentSubtasks?: ISubTask[];
  @Input() currentColumnId?: number;
  @Input() completedTasks?: number;
  taskForm!: FormGroup;
  columns$: Observable<IColumn[]> = combineLatest([
    this.route.paramMap,
    this.store.select(selectColumns),
  ]).pipe(
    map(([params, columns]) =>
      columns.filter((column) => column.boardId.toString() === params.get('id'))
    )
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      subtasks: this.fb.array([]),
      columnId: [this.currentColumnId],
    });

    this.currentSubtasks?.forEach((subtask) => {
      this.subtasks.push(
        this.fb.group({
          id: [subtask.id, Validators.required],
          taskId: [this.currentTask?.id, Validators.required],
          title: [subtask.title, Validators.required],
          isCompleted: [subtask.isCompleted, Validators.required],
        })
      );
    });
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  onToggle(id: number) {
    const currentSubtaskStatus = this.subtasks.value.find(
      (subtask: ISubTask) => subtask.id === id
    ).isCompleted;

    this.store.dispatch(
      toggleSubtask({
        update: { id, changes: { isCompleted: !currentSubtaskStatus } },
      })
    );
  }

  onSelect() {
    if (this.currentTask) {
      this.store.dispatch(
        updateTaskColumn({
          update: {
            id: this.currentTask.id,
            changes: { columnId: this.taskForm.get('columnId')?.value },
          },
        })
      );
    }
  }
}
