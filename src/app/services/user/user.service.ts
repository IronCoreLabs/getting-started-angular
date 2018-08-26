import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Subject } from 'rxjs';
import { IronService } from '../iron/iron.service';
import { CHECKBOX_REQUIRED_VALIDATOR } from '@angular/forms/src/directives/validators';

const spock = 'assets/avatars/spock.jpg';
const mccoy = 'assets/avatars/mccoy.jpg';
const sulu = 'assets/avatars/sulu.jpg';
const redshirt = 'assets/avatars/redshirt.jpg';
const chekov = 'assets/avatars/chekov.jpg';
const kirk = 'assets/avatars/kirk.jpg';
const uhura = 'assets/avatars/uhura.jpg';

export const KIRK = '550';
export const MCCOY = '551';
export const SULU = '552';
export const CHEKOV = '553';
export const SPOCK = '554';
export const UHURA = '555';
export const REDSHIRT = '556';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _active: User;

  readonly userChange: Subject<User>;
  readonly userChanging: Subject<User>;
  readonly users: Map<string, User>;

  constructor(private ironService: IronService) {
    this.users = new Map<string, User>();
    this.users.set(KIRK, new User(KIRK, 'Kirk', kirk));
    this.users.set(MCCOY, new User(MCCOY, 'McCoy', mccoy));
    this.users.set(SULU, new User(SULU, 'Sulu', sulu));
    this.users.set(CHEKOV, new User(CHEKOV, 'Chekov', chekov));
    this.users.set(SPOCK, new User(SPOCK, 'Spock', spock));
    this.users.set(UHURA, new User(UHURA, 'Uhura', uhura));
    this.users.set(REDSHIRT, new User(REDSHIRT, 'Redshirt', redshirt));

    this.userChange = new Subject<User>();
    this.userChanging = new Subject<User>();

    this._active = this.users[KIRK];
  }

  // Properties

  get active(): User {
    return this._active;
  }

  set active(user: User) {
    this.userChanging.next(user);
    this._active = user;
    this.ironService.asUser(user).then(() => this.userChange.next(user));
  }

  // Methods

  get(id: string): User {
    return this.users.get(id);
  }

  setActiveByID(id: string) {
    const user = this.get(id);
    if (user) {
      this.active = user;
    }
  }
}
