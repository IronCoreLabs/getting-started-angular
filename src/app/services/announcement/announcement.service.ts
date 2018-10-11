import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Announcement, AnnouncementType } from './announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  readonly newAnnouncement$: Subject<Announcement>;

  constructor() {
    this.newAnnouncement$ = new Subject<Announcement>();
  }

  announce(aore: Announcement | Error) {
    if (this.isAnnouncement(aore)) {
      this.newAnnouncement$.next(aore);
    } else {
      this.newAnnouncement$.next(Announcement.fromError(aore));
    }
  }

  isAnnouncement(a: Announcement | Error): a is Announcement {
    return (a as Announcement).isAnnouncement !== undefined;
  }

  error(message: string) {
    this.announce(new Announcement(AnnouncementType.Error, message));
  }
}
