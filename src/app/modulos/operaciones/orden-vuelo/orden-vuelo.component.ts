import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';
import { PerfilService } from 'src/app/servicios/modulos/operaciones/perfil.service';

export class Model {
  title = "";  
  isLectura = false;
  tipo = "C";
  loader = false;
  total = 0;
  total_num_pag = 0;
  num_pag = 1;
  num_fila = 50;

  varVuelo: any = {
    orden_id: 0,
    nombre_vuelo: "",
    codigo: "",
    hora_salida: "",
    hora_llegada: ""
  }
}

@Component({
  selector: 'app-orden-vuelo',
  templateUrl: './orden-vuelo.component.html',
  styleUrls: ['./orden-vuelo.component.scss']
})
export class OrdenVueloComponent implements OnInit {

  datos: any = [
    {
      orden_id: 1,
      nombre_vuelo: "Demo 1",
      codigo: "HYU780K",
      hora_salida: "12:30:50",
      hora_llegada: "21:45:08",
    },
    {
      orden_id: 2,
      nombre_vuelo: "Demo 2",
      codigo: "THU890R",
      hora_salida: "15:24:12",
      hora_llegada: "19:01:32",
    },
    {
      orden_id: 3,
      nombre_vuelo: "Demo 3",
      codigo: "NHT657M",
      hora_salida: "20:04:11",
      hora_llegada: "01:14:44",
    }
  ];

  varhistorial: any = [];
  varhistorialTemp: any = [];

  model = new Model();

  modal: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private perfil: PerfilService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getPerfiles(this.model.num_pag);
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getPerfiles(num_pag: number) {
    // this.model.loader = true;
    this.perfil.getPerfiles({ numero_pagina: num_pag, numero_fila: this.model.num_fila}).subscribe((data: any) => {
      // setTimeout(() => {
      //   this.model.loader = false;
      // }, 2000);
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
        this.model.total = response.total;
        this.model.total_num_pag = Math.ceil(response.total / this.model.num_fila);
      }
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.perfil_id.toString().indexOf(filtro) !== -1 ||
            item.nombres.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.apellidos.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }

  openCrear() {
    this.model.title = "Crear";
    this.model.isLectura = false;
    this.model.tipo = "C";

    this.modal = true;
  }

  openEditar(data: any) {
    this.model.title = "Actualizar";
    this.model.isLectura = false;
    this.model.tipo = "U";

    this.modal = true;

    this.model.varVuelo.orden_id = data.orden_id;
    this.model.varVuelo.nombre_vuelo = data.nombre_vuelo;
    this.model.varVuelo.codigo = data.codigo;
    this.model.varVuelo.hora_salida = data.hora_salida;
    this.model.varVuelo.hora_llegada = data.hora_llegada;
  }

  closeModal(bol: any) {
    this.modal = bol;
    this.reload();
  }

  save() {
    this.modal = false;
    this.reload();
  }

  update() {
    this.modal = false;
    this.reload();
  }

  first() {
    this.model.num_pag = 1;
    this.getPerfiles(1);
  }

  last() {
    this.model.num_pag = this.model.total_num_pag;
    this.getPerfiles(this.model.total_num_pag);
  }

  prev(page: number) {
    this.model.num_pag = page;
    this.model.num_pag--;
    if (this.model.num_pag == 1) this.model.num_pag = 1;
    this.getPerfiles(this.model.num_pag);
  }

  next(page: number) {
    this.model.num_pag = page;
    this.model.num_pag++;
    if (this.model.num_pag == this.model.total_num_pag) this.model.num_pag = this.model.total_num_pag;
    this.getPerfiles(this.model.num_pag);
  }
}
