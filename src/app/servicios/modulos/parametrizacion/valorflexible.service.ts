import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class ValorflexibleService {

  private apiGetTiposValores = this.api.baseurl + "valorflexible/GetTiposValores";
  private apiCreateTiposValores = this.api.baseurl + "valorflexible/CreateTiposValores";
  private apiUpdateTiposValores = this.api.baseurl + "valorflexible/UpdateTiposValores";

  private apiGetValoresFlexibles = this.api.baseurl + "valorflexible/GetValoresFlexibles";
  private apiCreateValoresFlexibles = this.api.baseurl + "valorflexible/CreateValoresFlexibles";
  private apiUpdateValoresFlexibles = this.api.baseurl + "valorflexible/UpdateValoresFlexibles";

  constructor(private http: HttpClient, private api: ApiService) { }

  getTiposValores(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetTiposValores, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createTiposValores(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateTiposValores, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateTiposValores(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateTiposValores, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  getValoresFlexibles(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetValoresFlexibles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  createValoresFlexibles(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateValoresFlexibles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  updateValoresFlexibles(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateValoresFlexibles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
