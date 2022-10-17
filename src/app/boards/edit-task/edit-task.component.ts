import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest } from 'rxjs';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { Column, Task } from '../../interfaces';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Input() task?: Task;
  columns$?: Column[];
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.store.select(selectAllBoards)])
      .pipe(
        map(([params, boards]) =>
          boards.find((board) => board.id.toString() === params.get('id'))
        )
      )
      .subscribe((board) => (this.columns$ = board?.columns));

    this.editForm = this.fb.group({
      title: [this.task?.title, [Validators.required, Validators.minLength(3)]],
      description: [this.task?.description],
      columnId: [this.task?.columnId, Validators.required],
      subtasks: this.fb.array([]),
    });

    this.task?.subtasks.forEach(({ title, isCompleted }) => {
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
