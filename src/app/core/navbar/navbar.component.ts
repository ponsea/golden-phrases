import { Component } from '@angular/core';

import { AppInfoService } from '../app-info.service';

@Component({
  selector: 'gp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = "";

  constructor(appInfo: AppInfoService) {
    this.title = appInfo.title;
  }
}
