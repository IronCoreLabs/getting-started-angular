import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {
  @Input() isShowDropdown = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  @Output() toggleDropdown(): void {
    this.isShowDropdown = !this.isShowDropdown;
  }

  get activeUser(): User {
    return this.userService.active;
  }
}
