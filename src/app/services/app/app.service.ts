import * as IronWeb from '@ironcorelabs/ironweb';
import { Injectable } from '@angular/core';
import { IronService } from '../iron/iron.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';
import * as Users from '../user/user.service';

const GROUP_ID_STORAGE_KEY = 'ironcore-test-group';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  testGroup: IronWeb.GroupMetaResponse;

  constructor(private ironService: IronService,
              private orderService: OrderService,
              private userService: UserService) {
  }

   /**
   * Get the test group to to use for the demo.
   *
   * Either retrieves an existing group if the ID is set,
   * or creates a new group.
   *
   * Either way will resolve with test group details.
   */
  private getTestGroupDetails() {
    const existingTestGroupID = localStorage.getItem(GROUP_ID_STORAGE_KEY);

    // this.ironService.createGroup({groupID: 'top-secret'}).then((group) => {
    //   console.log('top-secret group created');
    //   console.log(group);
    // });

    if (existingTestGroupID) {
      return this.ironService.getGroup(existingTestGroupID);
    }

    return this.ironService.createGroup().then((group) => {
      localStorage.setItem(GROUP_ID_STORAGE_KEY, group.groupID);
      return group;
    });
  }

  /**
   * Initialize the sample app
   */
  init() {
    // Set Kirk as the active user
    this.userService.setActiveByID(Users.KIRK);

    // Get details for our test group
    return this.getTestGroupDetails().then((group) => {
      this.testGroup = group;
      this.orderService.groupID = group.groupID;
    });
  }
}
