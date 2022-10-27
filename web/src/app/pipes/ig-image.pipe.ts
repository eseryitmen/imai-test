import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'igImage'
})
export class IgImagePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url: string): Observable<SafeUrl> {
    return this.http
        .post(`${environment.url}image`, { url }, { responseType: 'blob' })
        .pipe(
          catchError(() => this.http.get('/assets/err-placeholder.png', { responseType: 'blob' })),
          map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
        );
  }

}
