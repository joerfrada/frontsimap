import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalRegistros: number = 0;
  @Input() registroPorPagina: number = 1;
  @Input() actualPagina: number = 0;
  @Output() first = new EventEmitter<void>();
  @Output() last = new EventEmitter<void>();
  @Output() prev = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onFirst() {
    this.actualPagina = 1;
    this.first.emit();
  }

  onLast() {
    this.actualPagina = this.registroPorPagina;
    this.last.emit();
  }

  onPrev(page: number) {
    this.actualPagina = page;
    this.prev.emit(this.actualPagina);
  }

  onNext(page: number) {
    this.actualPagina = page;
    this.next.emit(this.actualPagina);
  }
}
