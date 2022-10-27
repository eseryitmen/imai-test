import { Component, Input } from '@angular/core';
import { ProfileItem } from '../profile.interface';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() profile!: ProfileItem;
}
