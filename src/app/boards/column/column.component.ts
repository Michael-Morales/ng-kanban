import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import { selectPopulatedBoards } from '../state/boards.selectors';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  columns?: Column[] = [];
  formGroup: FormGroup = this.fb.group({
    title: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store
        .select(selectPopulatedBoards)
        .pipe(
          map((boards) => boards.find((board) => board.id === params.get('id')))
        )
        .subscribe((board) => {
          if (!board) {
            this.router.navigateByUrl('/404');
          } else {
            this.columns = board.columns;
          }
        });
    });
  }
}
