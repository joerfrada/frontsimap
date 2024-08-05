import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aviso-modal',
  templateUrl: './aviso-modal.component.html',
  styleUrls: ['./aviso-modal.component.scss']
})
export class AvisoModalComponent implements OnInit {

  @Input() show?: Boolean;
  @Input() size?: String;
  @Output() close = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

}
