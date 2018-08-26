import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-hover',
  templateUrl: './avatar-hover.component.html',
  styleUrls: ['./avatar-hover.component.css']
})
export class AvatarHoverComponent implements OnInit {
  @Input() public src: string;

  constructor() { }

  ngOnInit() {
  }

  computeStyle() {
    return {
      background: `url("${this.src}") 0 0 no-repeat`,
      'background-size': 'cover',
      height: '80px',
      width: '80px'
    };
  }
}
