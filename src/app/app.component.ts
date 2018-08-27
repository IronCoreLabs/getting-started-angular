import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './services/user/user.service';
import { IronService } from './services/iron/iron.service';
import { Utils } from './utils';
import { AppService } from './services/app/app.service';
import { User } from './services/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ironcore Getting Started Angular';

  // Kick off services
  constructor(private appService: AppService,
              private userService: UserService,
              private ironService: IronService) {
  }

  ngOnInit() {
    this.appService.init();
  }

  @Input() get activeUser(): User {
    return this.userService.active;
  }
}
