import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { ModalService } from 'src/app/shared/modal.service';

import { selectColumns } from '../../store/selectors/boards.selectors';
import { createTask } from '../../store/actions/boards.actions';
import { generateId } from '../../store/reducers/boards.reducer';

import { IColumn } from '../../interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {
  @Input() boardId?: string;
  newTaskId: number = generateId();
  columns$: Observable<IColumn[]> = this.store
    .select(selectColumns)
    .pipe(
      map((columns) =>
        columns.filter((column) => column.boardId.toString() === this.boardId)
      )
    );
  addForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    columnId: ['', Validators.required],
    description: [''],
    subtasks: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  get subtasks() {
    return this.addForm.get('subtasks') as FormArray;
  }

  onDelete(index: number) {
    this.subtasks.removeAt(index);
  }

  onAddNewSubtask() {
    this.subtasks.push(
      this.fb.group({
        id: generateId(),
        taskId: this.newTaskId,
        title: ['', [Validators.required, Validators.minLength(3)]],
        isCompleted: [false],
      })
    );
  }

  onSave() {
    if (this.addForm.valid && this.addForm.value) {
      const {
        title,
        columnId,
        description,
      }: { title: string; columnId: number; description: string } =
        this.addForm.value;

      this.store.dispatch(
        createTask({
          task: { id: this.newTaskId, title, columnId, description },
          subtasks: this.subtasks.value,
        })
      );

      this.modalService.closeModal();
    }
  }
}
