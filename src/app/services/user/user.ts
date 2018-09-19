/**
 * Represents a crew member. Can be the active user
 * part of the away team or a member of the crew.
 */
export class User {
    constructor(readonly id: string,
        readonly name: string,
        readonly img: string,
        public role: string,
        readonly isAdmin: Boolean = false,
        public isLoading: Boolean = false,
        public isBeingAddedOrRemoved: Boolean = false) {
    }
}
