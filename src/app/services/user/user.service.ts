import { Injectable } from "@angular/core";
import { User } from "./user";
import { Subject } from "rxjs";
import { IronService } from "../iron/iron.service";

/**
 * URL paths to avatar images
 */
const spock = "assets/avatars/spock.jpg";
const mccoy = "assets/avatars/mccoy.jpg";
const sulu = "assets/avatars/sulu.jpg";
const redshirt = "assets/avatars/redshirt.jpg";
const chekov = "assets/avatars/chekov.jpg";
const kirk = "assets/avatars/kirk.jpg";
const uhura = "assets/avatars/uhura.jpg";

/**
 * For demonstration purposes, we use well-known ids for
 * our users.
 */
export const KIRK = "550";
export const MCCOY = "551";
export const SULU = "552";
export const CHEKOV = "553";
export const SPOCK = "554";
export const UHURA = "555";
export const REDSHIRT = "556";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private _active: User;
    private _isChanging: Boolean;

    /**
     * Use the "service-subject" pattern
     *
     * Announce on changes in active user ('login'), both initiation and
     * completion.
     */
    readonly userChanged: Subject<User>;
    readonly userChanging: Subject<User>;

    /**
     * The set of well-known users
     */
    readonly users: Map<string, User>;

    constructor(private ironService: IronService) {
        /**
         * Initialize our crew members. Note that in the sample application
         * only Kirk is an admin (which allows him to add and remove members
         * from the away-team).
         */
        this.users = new Map<string, User>();
        this.users.set(KIRK, new User(KIRK, "Kirk", kirk, "Starship Captain", true));
        this.users.set(MCCOY, new User(MCCOY, "McCoy", mccoy, "Starship Enterprise"));
        this.users.set(SULU, new User(SULU, "Sulu", sulu, "Starship Enterprise"));
        this.users.set(CHEKOV, new User(CHEKOV, "Chekov", chekov, "Starship Enterprise"));
        this.users.set(SPOCK, new User(SPOCK, "Spock", spock, "Starship Enterprise"));
        this.users.set(UHURA, new User(UHURA, "Uhura", uhura, "Starship Enterprise"));
        this.users.set(REDSHIRT, new User(REDSHIRT, "Redshirt", redshirt, "Starship Enterprise"));

        this._active = this.users[KIRK];
        this._isChanging = false;

        // Service/Subject pattern

        this.userChanged = new Subject<User>();
        this.userChanging = new Subject<User>();
    }

    // Properties

    /**
     * Returns the active user, which changes when a login event is initiated
     */
    get active(): User {
        return this._active;
    }

    /**
     * Set a new active user, kicking off a re-initialization of the IronCore
     * SDK with this user's identity
     */
    set active(user: User) {
        // Reflect the change
        this._active = user;
        this._isChanging = true;

        // Announce the user is about to change event
        user.isLoading = true;
        this.userChanging.next(user);

        // (Re-)Initialize the IronCore Service
        this.ironService.asUser(user).then(() => {
            // Bookkeeping
            this._isChanging = false;
            user.isLoading = false;
            // Announce the user has changed event
            this.userChanged.next(user);
        });
    }

    /**
     * True if we have started an initialization of the IronCore SDK as a new
     * user, but have not yet completed
     */
    get isChanging(): Boolean {
        return this._isChanging;
    }

    // Methods

    /**
     * Returns the user by ID.
     *
     * @param id The id of the user to get
     */
    get(id: string): User {
        return this.users.get(id);
    }

    /**
     * Kicks off a user change event, intializing the IronCore SDK with that
     * user's identity.
     *
     * @param id The user ID to set
     */
    setActiveByID(id: string) {
        const user = this.get(id);
        if (user) {
            this.active = user;
        }
    }
}
