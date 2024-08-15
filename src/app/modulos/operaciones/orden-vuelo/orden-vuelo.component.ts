import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';

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

  constructor(private router: Router, private api: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
  }

  search(e: any) {}

  clearSearch(e: any) {}
}
