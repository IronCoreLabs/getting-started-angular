import * as IronWeb from '@ironcorelabs/ironweb';
import { Injectable } from '@angular/core';
import { IronService } from '../iron/iron.service';
import * as Users from '../user/user.service';
import { IronPolicyFactory } from '../iron/iron-policy-factory';
import { Utils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    testGroup: IronWeb.GroupMetaResponse;

    constructor(
        private ironPolicyFactory: IronPolicyFactory,
        private ironService: IronService,
        private userService: Users.UserService) {
    }

    /**
    * Creates a random test group to use for the demo.
    */
    private getTestGroupDetails() {
        const groupName = `top-secret-${Utils.randomInt()}`;
        return this.ironService.createGroup({ groupName }).then((group) => { return group; });
    }

    /**
     * Initialize the sample app
     */
    init() {
        // Set Kirk as the active user
        this.userService.setActiveByID(Users.KIRK);

        // Get details for our test group
        return this.getTestGroupDetails().then((group) => {
            this.ironPolicyFactory.bindings.set('top-secret', group.groupID);
        });
    }
}
