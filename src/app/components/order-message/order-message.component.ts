import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-order-message',
    templateUrl: './order-message.component.html',
    styleUrls: ['./order-message.component.css']
})
export class OrderMessageComponent implements OnInit {
    @Input() public message: string;

    constructor() { }

    ngOnInit() {
    }
}
