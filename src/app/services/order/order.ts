import { Ironable } from '../iron/ironable';
import { Utils } from '../../utils';

@Ironable({groupId: 'away-team'})
export class Order {
    public date = new Date();
    constructor(public title: string, public message: string, public id?: Number) {
        this.id = id || Utils.randomInt();
    }
}
