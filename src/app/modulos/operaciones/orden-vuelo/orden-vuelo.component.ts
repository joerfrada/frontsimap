import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';

export class Model {
  title = "";  
  isLectura = false;
  tipo = "C";

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

  constructor(private router: Router, private api: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.varhistorial = this.datos;
    this.varhistorialTemp = this.datos;
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.nombre_vuelo.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.codigo.toString().toLowerCase().indexOf(filtro) !== -1) {
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
  }

  save() {
    this.modal = false;
    this.reload();
  }

  update() {
    this.modal = false;
    this.reload();
  }
}
