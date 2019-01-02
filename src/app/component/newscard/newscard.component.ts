import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newscard',
  templateUrl: './newscard.component.html',
  styleUrls: ['./newscard.component.scss']
})
export class NewscardComponent {

  @Input() news;
  @Output() detail = new EventEmitter();

  constructor() { }

  newsDetails() {
    this.detail.emit();
  }
}
