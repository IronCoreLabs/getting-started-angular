const GROUP_ID_STORAGE_KEY = 'ironcore-test-group';

export class Utils {
    /**
     * Get any existing group ID from local storage
     */
    static getTestGroup() {
        return localStorage.getItem(GROUP_ID_STORAGE_KEY);
    }

    /**
     * Set the provided group ID within local storage
     */
    static setTestGroup(groupID) {
        return localStorage.setItem(GROUP_ID_STORAGE_KEY, groupID);
    }

    static randomInt() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
}
