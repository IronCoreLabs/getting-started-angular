import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSelect(): void {
    console.log('ActiveUserComponent.onSelect()');
  }
}
