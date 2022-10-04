import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

import { BoardsService } from '../boards.service';
import { ModalService } from 'src/app/shared/modal.service';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  columns: Column[] | undefined = [];
  formGroup: FormGroup = this.fb.group({
    title: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private router: Router,
    private fb: FormBuilder,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(map(({ id }) => this.boardsService.getBoardById(id)))
      .subscribe((val) =>
        val.subscribe((board) => {
          if (board) {
            this.columns = board.columns;
          } else {
            this.router.navigateByUrl('/boards');
          }
        })
      );
  }
}
