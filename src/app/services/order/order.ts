import { IronEncrypt } from '../iron/iron-encrypt';
import { Utils } from '../../utils';

@IronEncrypt({groupId: 'top-secret'})
export class Order {
    public date = new Date();
    constructor(public title: string, public message: string, public id?: Number) {
        this.id = id || Utils.randomInt();
    }

    static revive(x: object): Order {
        const result = Object.assign(new Order('', ''), x);
        result.date = new Date(x['date']);
        return result;
    }
}
