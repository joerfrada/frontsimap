import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  currentUser: any;

  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleSideBar.emit();
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
      location.href = '/';
    }, 10);
  }

}
