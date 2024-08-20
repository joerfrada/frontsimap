import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

declare var swal:any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseurl = environment.baseUrl + "api/";

  constructor() { }

  public getHttpOptions(tipo = 'l'): any {
    let currentUser = JSON.parse(localStorage.getItem("currentUser") as any);

    if (tipo == 'l') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf8',
          'Data-Type': 'json'
        })
      };
    }
    else if (tipo == 'g') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Data-Type': 'json',
          'Accept': 'json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'USER': currentUser.usuario
        })
      };
    }
    else if (tipo == 'b') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf8',
          'Data-Type': 'json'
        }),
        responseType: 'blob' as 'json'
      };
    }
  }

  get getBaseUrl() {
    return this.baseurl;
  }

  /* Error Exceptions */
  public errorHandle(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.Message;
      swal({
        type: 'error',
        text: errorMessage
      });
    }
    else {
      if (error.status === 0) {
        errorMessage = "El servidor está apagado o inaccesible. Contacte a su administrador";
        swal({
          title: 'ERROR',
          type: 'error',
          text: errorMessage
        }).then((result: any) => {
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/';
          }, 500);
        });
      }
      else if (error.status === 401) {
        errorMessage = "No está autorizado.";
        swal({
          title: 'ERROR',
          type: 'error',
          text: errorMessage
        }).then((result: any) => {
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/';
          }, 500);
        });
      }
      else if (error.status === 502) {
        errorMessage = "El servicio está suspendido. Contacte a su administrador";
        swal({
          title: 'ERROR',
          type: 'error',
          text: errorMessage
        });
      }
      else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        swal({
          title: 'ERROR',
          type: 'error',
          text: errorMessage
        });
      }
    }

    return throwError(errorMessage);
  }

  public ProcesarRespuesta(request: any) {
    if (request != undefined && request.tipo != 0 && request.tipo != -1) {
      swal({
        title: 'ERROR EN EL SISTEMA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'error'
      })
    }
    if (request != undefined && request.tipo == -1) {
      swal({
        title: 'ADVERTENCIA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'warning'
      });
    }
    if (request != undefined && request.tipo == -1 && request.codigo == 2) {
      swal({
        title: 'ADVERTENCIA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'warning'
      }).then((result: any) => {
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/index';
        }, 500);
      });
    }

    return request;
  }
}
