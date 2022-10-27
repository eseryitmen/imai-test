import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ProfileItem } from './profile.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  handle = '';
  items$?: Observable<ProfileItem[]>;
  loading = false;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  onEnter() {
    if (!this.handle) {
      alert('Please enter an instagram handle');
      return;
    }

    this.errorMessage = '';
    this.loading = true;
    this.items$ = this.apiService.getProfile(this.handle)
                              .pipe(
                                tap(() => this.loading = false),
                                catchError((err) => {
                                  this.loading = false;
                                  this.errorMessage = 'Could not load data.'

                                  return throwError(() => err);
                                })
                              );
  }
}
