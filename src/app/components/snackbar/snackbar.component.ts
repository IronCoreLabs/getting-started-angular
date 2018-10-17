import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement/announcement.service';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
    public message = '';
    public class = 'snackbar';
    private interval;

    constructor(private announcementService: AnnouncementService) {
    }

    ngOnInit() {
        this.announcementService.newAnnouncement$.subscribe((a) => {
            this.message = a.message;
            this.startTimer();
        });
    }

    private clear() {
        this.class = 'snackbar hide';
        clearInterval(this.interval);
    }

    private startTimer() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.clear();
        }, 1000 * 10);
    }
}
