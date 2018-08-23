import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-hover',
  templateUrl: './avatar-hover.component.html',
  styleUrls: ['./avatar-hover.component.css']
})
export class AvatarHoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  computeStyle() {
    return {
      background: 'url("assets/avatars/kirk.jpg") 0 0 no-repeat',
      'background-size': 'cover',
      height: '80px',
      width: '80px'
    };
  }
}
