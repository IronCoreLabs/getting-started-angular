import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSelect(): void {
    console.log('ActiveUserComponent.onSelect()');
  }

  get activeUser(): User {
    return this.userService.active;
  }
}
