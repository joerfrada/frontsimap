import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('toggle', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  allMenu: Menu[] = [];

  constructor(public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.allMenu = this.currentUser.menus;
  }

  ngOnInit(): void {
  }

  toggleCollapse(item: Menu) {
    item.collapsed = !item.collapsed;
  }

}
