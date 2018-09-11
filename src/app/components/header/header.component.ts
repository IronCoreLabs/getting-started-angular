import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

/**
 * Top Navigation/Header for application
 */
export class HeaderComponent implements OnInit {
    private _activeUser: User;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this._activeUser = this.userService.active;

        this.userService.userChanging.subscribe((user) => {
            this._activeUser = user;
        });
    }

    getActiveUser(): User {
        return this.userService.active;
    }

    @Input() get activeUser(): User {
        return this._activeUser;
    }

}
