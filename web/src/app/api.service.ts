import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileItem } from './profile.interface';
import { of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProfile(handle: string) {
    return this.http.get<ProfileItem[]>(`${environment.url}${handle}`);
  }
}
