import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { LoginService } from '../../servicios/auth/login.service';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  usuario: any = "";
  password: any = "";

  loader = false;
  aviso = true;

  constructor(private loginService: LoginService, private api: ApiService) {
    let t = localStorage.getItem("_expiredTime");
    if (t != null || t != undefined) {
      localStorage.removeItem("_expiredTime");
    }
  }

  ngOnInit(): void {}

  inputNext() {
    $('.inputp').focus();
  }

  login() {    
    this.loginService.login({ usuario: this.usuario, password: this.password }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo === 0) {
        this.loader = true;
        localStorage.setItem("currentUser", JSON.stringify(response.result));
        localStorage.setItem("token", response.token);
        localStorage.setItem("expires", response.expires)        
        setTimeout(() => {
          location.href = "/simap/home";
        }, 2000);
      }
      else {
        swal({
          title: 'ERROR',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'error'
        }).then((result: any) => {
          if (result) {
            this.usuario = "";
            this.password = "";
          }
        });
      }
    });
  }

  closeModal() {
    this.aviso = false;
  }
}
