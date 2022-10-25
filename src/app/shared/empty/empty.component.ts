import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
})
export class EmptyComponent implements OnInit {
  @Input() content = '';

  constructor() {}

  ngOnInit(): void {}
}
