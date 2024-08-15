import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiGetPerfiles = this.api.baseurl + "perfil/GetPerfiles";

  constructor(private http: HttpClient, private api: ApiService) {}

  public getPerfiles(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetPerfiles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
