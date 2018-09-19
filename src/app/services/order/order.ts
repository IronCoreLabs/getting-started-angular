import { IronEncrypt } from "../iron/iron-encrypt";
import { Utils } from "../../utils";
// import { IronStatus } from "../iron/iron-status";

// TODO: Binding syntax
// TODO: Decrypt routes/policy

/**
 * Order is a simple representation of an Order used as a data transfer
 * object.
 *
 * By decorating the class with an IronEncrypt attribute, we add a small
 * piece of metadata to the constructor prototype. This metadata defines
 * the encryption policy. The encryption policy is used by the
 * IronHttpInterceptor to provide transparent transform encryption.
 */
@IronEncrypt({ groupId: "[top-secret]" })
export class Order {
    public date = new Date();
    // TODO: Move this to the decorator and define a property
    //   private __ironStatus = new IronStatus();

    /**
     * For our simple demo example an order consists of a title and a message.
     *
     * A random integer id is generated unless explicitly provided. The date
     * is initialized at time of construction.
     *
     * @param title The title of the order
     * @param message The body of the order
     * @param id An optional numeric unique primary key. Randomly generated if
     * not provided.
     */
    constructor(
        public title: string,
        public message: string,
        public id?: number
    ) {
        this.id = id || Utils.randomInt();
    }

    /**
     * The typed HttpClient methods (e.g., http.get<Order>(...)) only cast the
     * JSON.parsed object. The methods do not return an actual TypeScript object
     * nor do they correctly parse dates.
     *
     * The order service calls this method to address these issues, parsing
     * the date and returning an actual type with prototype methods and
     * properties.
     *
     * @param json
     */
    static revive(json: object): Order {
        // Marshall json properties
        const result = Object.assign(new Order("", ""), json);

        // Convert the date string to a date object
        result.date = new Date(json["date"]);

        // And return the typescript type
        return result;
    }
}
