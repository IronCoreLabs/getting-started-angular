import { Component, OnInit, Input } from '@angular/core';
import { AppService } from './services/app/app.service';
import { UserService } from './services/user/user.service';
import { User } from './services/user/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Ironcore Getting Started Angular';
    private _activeUser: User;

    // Kick off services
    constructor(private appService: AppService,
                private userService: UserService) {
    }

    ngOnInit() {
        // Initialize services
        this.appService.init();

        // The application starts with an initial mock user
        // 'logged in'
        this._activeUser = this.userService.active;

        // Subscribe to changes in the active user, this fires
        // when the change initiates
        this.userService.userChanging.subscribe((user) => this._activeUser = user);

        // Subscribe to changed active users, this fires
        // when the change completes
        this.userService.userChanged.subscribe((user) => this._activeUser = user);
    }

    /**
     * @description @Input property for active user
     * @returns Returns the active (logged in) user
     */
    @Input()
    get activeUser(): User {
        return this._activeUser;
    }
}
