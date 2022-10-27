import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProfileItem } from '../profile.interface';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent {
  @Input() image!: ProfileItem;

  hover = false;

  @HostListener('mouseenter')
  onMouseOver() {
    this.hover = true;
  }

  @HostListener('mouseleave')
  onMouseOut() {
    this.hover = false;
  }
}
