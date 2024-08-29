import { Component, OnInit, OnDestroy } from '@angular/core';
import IdleTimer from '../../assets/libs/IdleTimer';

@Component({
  selector: 'app-simap',
  templateUrl: './simap.component.html',
  styleUrls: ['./simap.component.scss']
})
export class SimapComponent implements OnInit, OnDestroy {

  sideBarOpen = true;
  timer: any;

  constructor() {}

  ngOnInit(): void {
    let t = localStorage.getItem("_expiredTime");
    if (t == null || t == undefined) {
      localStorage.removeItem("_expiredTime");

      this.timer = new IdleTimer({
        timeout: 60 * 5, //expired after 5 min
        onTimeout: () => {
          this.logout();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.timer = null;
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
      location.href = '/';
    }, 10);
  }

}
