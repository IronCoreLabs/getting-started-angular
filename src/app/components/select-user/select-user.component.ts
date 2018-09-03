import { Component, OnInit, Injectable, Output } from '@angular/core';
import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';

/**
 * This is the dropdown to select a user to login
 */
@Component({
    selector: 'app-select-user',
    templateUrl: './select-user.component.html',
    styleUrls: ['./select-user.component.css']
})
@Injectable()
export class SelectUserComponent implements OnInit {
    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    @Output() selectUser(user: User): void {
        this.userService.active = user;
    }

    get users(): User[] {
        const activeId = this.userService.active.id;
        return Array.from(this.userService.users.values())
            .filter((u) => u.id !== activeId)
            .sort((a, b) => a.id > b.id ? 1 : -1);
    }
}
