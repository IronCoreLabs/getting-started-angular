import { Component, OnInit, Input } from '@angular/core';

/**
 * User representation with Avatar and text
 */
@Component({
    selector: 'app-avatar-hover',
    templateUrl: './avatar-hover.component.html',
    styleUrls: ['./avatar-hover.component.css']
})
export class AvatarHoverComponent implements OnInit {
    @Input() public src: string;
    @Input() public size: Number = 110;

    constructor() { }

    ngOnInit() {
    }

    computeStyle() {
        const sizepx = this.size + 'px';
        return {
            'background-image': `url("${this.src}")`,
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            height: sizepx,
            width: sizepx
        };
    }
}
