import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BoardsService } from '../boards.service';

import { Column, Task } from '../../interfaces';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Input() task?: Task;
  @Input() currentColumn = '';
  columns?: Column[];
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.boardsService
        .getBoardColumns(params.get('id'))
        .subscribe((columns) => (this.columns = columns));
    });

    this.editForm = this.fb.group({
      title: [this.task?.title, [Validators.required, Validators.minLength(3)]],
      description: [this.task?.description],
      status: [this.task?.status, Validators.required],
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
