import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest, Observable } from 'rxjs';

import { ModalService } from 'src/app/shared/modal.service';

import { generateId } from '../../store/reducers/boards.reducer';
import { selectColumns } from '../../store/selectors/boards.selectors';
import { updateTask, deleteSubtask } from '../../store/actions/boards.actions';

import { IColumn, ISubTask, ITask } from '../../interfaces';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
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
    private store: Store,
    private modalService: ModalService
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

    this.currentSubtasks?.forEach(({ id, taskId, title, isCompleted }) => {
      this.subtasks.push(
        this.fb.group({
          id: [id, Validators.required],
          taskId: [taskId, Validators.required],
          title: [title, [Validators.required, Validators.minLength(3)]],
          isCompleted,
        })
      );
    });
  }

  get subtasks() {
    return this.editForm.get('subtasks') as FormArray;
  }

  onDelete(index: number, id: number) {
    this.subtasks.removeAt(index);
    this.store.dispatch(deleteSubtask({ id }));
  }

  onAddNewSubtask() {
    this.subtasks.push(
      this.fb.group({
        id: [generateId(), Validators.required],
        taskId: [this.currentTask?.id, Validators.required],
        title: ['', [Validators.required, Validators.minLength(3)]],
        isCompleted: [false],
      })
    );
  }

  onSave() {
    if (this.editForm.valid && this.currentTask) {
      const { title, description, columnId } = this.editForm.value;

      this.store.dispatch(
        updateTask({
          task: {
            id: this.currentTask.id,
            changes: {
              title,
              description,
              columnId,
            },
          },
          subtasks: this.subtasks.value,
        })
      );

      this.modalService.closeModal();
    }
  }
}
