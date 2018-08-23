import { IronEncrypt } from '../iron/iron-encrypt';
import { Utils } from '../../utils';

@IronEncrypt({groupId: 'away-team'})
export class Order {
    public date = new Date();
    constructor(public title: string, public message: string, public id?: Number) {
        this.id = id || Utils.randomInt();
    }
}
