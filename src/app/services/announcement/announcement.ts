export enum AnnouncementType {
    Error,
    Success,
    Info,
    Warn
}

export class Announcement {
    constructor(public type: AnnouncementType, public message: string) {
    }

    static fromError(e: Error) {
        return new Announcement(AnnouncementType.Error, e.message);
    }

    isAnnouncement() {
        return true;
    }
}
