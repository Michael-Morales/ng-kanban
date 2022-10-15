import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { selectAllBoards } from '../state/boards.selectors';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Input() boardId?: number;
  columns?: Column[];
  addForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: ['', Validators.required],
    subtasks: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectAllBoards)
      .pipe(map((boards) => boards.find((board) => board.id === this.boardId)))
      .subscribe((board) => (this.columns = board?.columns));
  }

  get subtasks() {
    return this.addForm.get('subtasks') as FormArray;
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
    console.log('Creating new task');
  }
}
