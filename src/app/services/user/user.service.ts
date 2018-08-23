import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';
import { IronService } from '../iron/iron.service';

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
  readonly userChange: BehaviorSubject<User>;
  readonly users: Map<string, User>;

  constructor(private ironService: IronService) {
    this.users = new Map<string, User>();
    this.users.set(KIRK, new User(KIRK, 'Kirk', kirk));
    this.users.set(MCCOY, new User(MCCOY, 'McCoy', mccoy));
    this.users.set(SPOCK, new User(SPOCK, 'Spock', spock));
  }

  // Properties

  get active(): User {
    return this.userChange.getValue();
  }

  set active(user: User) {
    this.ironService.asUser(user);
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
