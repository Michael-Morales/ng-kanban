import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
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
      title: [this.task?.title],
      description: [this.task?.description],
      status: [this.task?.status],
      subtasks: this.fb.array([]),
    });

    this.task?.subtasks.forEach(({ title, isCompleted }) => {
      this.subtasks.push(
        this.fb.group({
          title,
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
        title: [''],
        isCompleted: [false],
      })
    );
  }

  onSave() {
    console.log('Saving changes');
  }
}
