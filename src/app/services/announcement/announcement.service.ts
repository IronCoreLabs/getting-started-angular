import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Announcement, AnnouncementType } from './announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  readonly newAnnouncement$: ReplaySubject<Announcement>;

  constructor() {
    this.newAnnouncement$ = new ReplaySubject<Announcement>(1);
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
