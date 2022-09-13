import { Component, OnInit } from '@angular/core';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards: Board[] = [
    { id: '1', name: 'platform launch', columns: [] },
    { id: '2', name: 'marketing plan', columns: [] },
  ];

  constructor() {}

  ngOnInit(): void {}
}
