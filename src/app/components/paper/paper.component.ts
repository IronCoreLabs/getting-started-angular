import { Component, OnInit } from '@angular/core';

/**
 * Wrapper div to apply css styling
 */
@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  computeStyle() {
    return {};
  }
}
