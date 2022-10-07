import { Component, OnInit, Input } from '@angular/core';

import { HeaderService } from '../header.service';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  @Input() boards?: Board[] = [];

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {}
}
