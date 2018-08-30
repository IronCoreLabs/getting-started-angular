import { Component, OnInit, Input } from '@angular/core';

/**
 * User representation with Avatar and text
 */

// TODO: fix styling
// TODO: decide on loading semantics
@Component({
  selector: 'app-avatar-hover',
  templateUrl: './avatar-hover.component.html',
  styleUrls: ['./avatar-hover.component.css']
})
export class AvatarHoverComponent implements OnInit {
  @Input() public src: string;
  @Input() public size: Number = 110;
  @Input() public iconClasses = '';
  @Input() public iconColor = '';
  @Input() public loading = false;

  // Initialization

  constructor() { }

  ngOnInit() {
  }

  // Methods

  computeIconClasses() {
    if (this.loading) {
      return 'fas fa-spinner fa-spin fa-3x';
    }

    return this.iconClasses + ' fa-3x';
  }

  computeIconStyle() {
    if (this.iconColor === '') {
      return {};
    }

    return {
      color: this.iconColor
    };
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
