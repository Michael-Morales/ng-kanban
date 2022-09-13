import { Component, OnInit } from '@angular/core';

import { data } from '../mock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards = data;

  constructor() {}

  ngOnInit(): void {}
}
