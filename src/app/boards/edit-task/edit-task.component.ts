import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest, Observable } from 'rxjs';

import { selectColumns } from '../../store/selectors/boards.selectors';

import { IColumn, ISubTask, ITask } from '../../interfaces';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Input() currentTask?: ITask;
  @Input() currentSubtasks?: ISubTask[];
  columns$: Observable<IColumn[]> = combineLatest([
    this.route.paramMap,
    this.store.select(selectColumns),
  ]).pipe(
    map(([params, columns]) =>
      columns.filter((column) => column.boardId.toString() === params.get('id'))
    )
  );
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [
        this.currentTask?.title,
        [Validators.required, Validators.minLength(3)],
      ],
      description: [this.currentTask?.description],
      columnId: [this.currentTask?.columnId, Validators.required],
      subtasks: this.fb.array([]),
    });

    this.currentSubtasks?.forEach(({ title, isCompleted }) => {
      this.subtasks.push(
        this.fb.group({
          title: [title, [Validators.required, Validators.minLength(3)]],
          isCompleted,
        })
      );
    });
  }

  get subtasks() {
    return this.editForm.get('subtasks') as FormArray;
  }

  onDelete(index: number) {
    this.subtasks.removeAt(index);
  }

  onAddNewSubtask() {
    this.subtasks.push(
      this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        isCompleted: [false],
      })
    );
  }

  onSave() {
    console.log('Saving changes');
  }
}
