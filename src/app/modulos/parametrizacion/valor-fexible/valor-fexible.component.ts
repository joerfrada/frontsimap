import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';
import { ValorflexibleService } from 'src/app/servicios/modulos/parametrizacion/valorflexible.service';

declare var swal: any;

export class Model {
  title = "";
  titleTipo = "";
  titleValor = "";
  isLectura = false;
  tipo = "C";

  loader = false;
  total = 0;
  total_num_pag = 0;
  num_pag = 1;
  num_fila = 50;

  loaderv = false;
  totalv = 0;
  total_num_pagv = 0;
  num_pagv = 1;
  num_filav = 50;

  varTipo: any = {
    id_tipo_valor: 0,
    tipo: '',
    descripcion: '',
    activo: true,
    id_tipo_valor_padre: 0,
  }

  varValor: any = {
    id_valor_flexible: 0,
    valor: '',
    sigla: '',
    orden: 0,
    activo: true,
    id_valor_flexible_padre: 0,
    atributo1: '',
    atributo2: '',
    atributo3: '',
    atributo4: '',
    id_tipo_valor: 0,
    tipo: ''
  }
}

@Component({
  selector: 'app-valor-fexible',
  templateUrl: './valor-fexible.component.html',
  styleUrls: ['./valor-fexible.component.scss']
})
export class ValorFexibleComponent implements OnInit {

  varhistorial: any = [];
  varhistorialTemp: any = [];

  varhistorialValor: any = [];
  varhistorialValorTemp: any = [];

  lstTipo: any = [];
  lstValor: any = [];

  model = new Model();

  tipoModal: any;
  valorModal: any;
  valorFlexibleModal: any;

  id_tipo_valor: any;
  tipo = '';

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private valor: ValorflexibleService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
    this.getTiposValores(this.model.num_pag);
  }
  
  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getTiposValores(num_pag: number) {
    this.lstTipo = [];
    this.model.loader = true;
    this.valor.getTiposValores({ numero_pagina: num_pag, numero_fila: this.model.num_fila}).subscribe((data: any) => {
      setTimeout(() => {
        this.model.loader = false;
      }, 2000);
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
          x.EditarRegistro = false;
          this.lstTipo.push({ id: x.id_tipo_valor, nombre: x.tipo });
        });

        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
        this.model.total = response.total;
        this.model.total_num_pag = Math.ceil(response.total / this.model.num_fila);
      }
    });
  }

  searchTipoValor(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.id_tipo_valor.toString().indexOf(filtro) !== -1 ||
            item.tipo.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchTipoValor(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }

  addTipo() {
    this.varhistorial.push({
      id_tipo_valor: 0,
      tipo: '',
      descripcion: '',
      activo: true,
      id_tipo_valor_padre: 0,
      NuevoRegistro: true,
      EliminarRegistro: false
    });
  }

  deleteValor(index: any) {
    this.varhistorial.splice(index, 1);
  }

  openCrearTipoValor() {
    this.model.titleTipo = "Crear";
    this.model.isLectura = false;
    this.model.tipo = "C";

    this.model.varTipo = new Model().varTipo;

    this.tipoModal = true;
  }

  openEditarTipoValor(data: any, index: any) {
    // this.model.titleTipo = "Actualizar - " + data.tipo;
    // this.model.isLectura = false;
    // this.model.tipo = "U";

    // this.model.varTipo.id_tipo_valor = data.id_tipo_valor;
    // this.model.varTipo.tipo = data.tipo;
    // this.model.varTipo.descripcion = data.descripcion;
    // this.model.varTipo.activo = data.activo;
    // this.model.varTipo.id_tipo_valor_padre = data.id_tipo_valor_padre;

    // this.tipoModal = true;
    this.varhistorial[index].EditarRegistro = true;
  }

  closeTipoValorModal(bol: any) {
    this.tipoModal = bol;
    this.reload();
  }

  saveTipoValor() {
    // this.model.varTipo.tipo = this.model.varTipo.tipo.toUpperCase();
    // this.model.varTipo.id_tipo_valor_padre = this.model.varTipo.id_tipo_valor_padre == 0 ? 0 : Number(this.model.varTipo.id_tipo_valor_padre);

    swal({
      title: 'Tipos Valores',
      text: "¿Desea crear nuevo registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then((result: any) => {
      if (result.dismiss != "cancel") {
        this.varhistorial.forEach((x: any) => {
          x.tipo = x.tipo.toUpperCase();
          x.id_tipo_valor_padre = x.id_tipo_valor_padre == 0 ? 0 : Number(x.id_tipo_valor_padre);

          if (x.NuevoRegistro == true) {
            this.valor.createTiposValores(x).subscribe(data => {});
          }
        });
        swal({
          title: 'Tipos Valores',
          text: 'El registro ha creado con éxito.',
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          type: 'success',
        }).then((result: any) => {
          this.tipoModal = false;
          this.reload();
        });      
      }
    });
  }

  updateTipoValor() {
    this.model.varTipo.tipo = this.model.varTipo.tipo.toUpperCase();
    this.model.varTipo.id_tipo_valor_padre = this.model.varTipo.id_tipo_valor_padre == 0 ? 0 : Number(this.model.varTipo.id_tipo_valor_padre);

    swal({
      title: 'Tipos Valores',
      text: "¿Desea actualizar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then((result: any) => {
      if (result.dismiss != "cancel") {
        this.valor.updateTiposValores(this.model.varTipo).subscribe((data: any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            swal({
              title: 'Tipos Valores',
              text: response.mensaje,
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              type: 'success',
            }).then((result: any) => {
              this.tipoModal = false;
              this.reload();
            })
          }
        });        
      }
    });
  }

  first() {
    this.model.num_pag = 1;
    this.getTiposValores(1);
  }

  last() {
    this.model.num_pag = this.model.total_num_pag;
    this.getTiposValores(this.model.total_num_pag);
  }

  prev(page: number) {
    this.model.num_pag = page;
    this.model.num_pag--;
    if (this.model.num_pag == 1) this.model.num_pag = 1;
    this.getTiposValores(this.model.num_pag);
  }

  next(page: number) {
    this.model.num_pag = page;
    this.model.num_pag++;
    if (this.model.num_pag == this.model.total_num_pag) this.model.num_pag = this.model.total_num_pag;
    this.getTiposValores(this.model.num_pag);
  }

  getValoresFlexibles(num_pag: any, id: any) {
    this.lstValor = [];
    this.model.loaderv = true;
    this.valor.getValoresFlexibles({ numero_pagina: num_pag, numero_fila: this.model.num_filav, id: id, data_text: null }).subscribe((data: any) => {
      setTimeout(() => {
        this.model.loaderv = false;
      }, 2000);
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.orden = (x.orden == 0) ? null : x.orden;
          this.lstValor.push({ id: x.id_valor_flexible, nombre: x.valor});
        });

        this.varhistorialValor = response.result;
        this.varhistorialValorTemp = response.result;
        this.model.totalv = response.total;
        this.model.total_num_pagv = Math.ceil(response.total / this.model.num_fila);
        console.log(this.model.varValor);
      }
    });
  }

  openValor(data: any) {
    this.valorModal = true;
    this.model.titleValor = "Valores Flexibles - " + data.tipo;
    this.id_tipo_valor = data.id_tipo_valor;
    this.tipo = data.tipo;

    this.getValoresFlexibles(1, data.id_tipo_valor);
  }

  closeValorModal(bol: any) {
    this.valorModal = bol;
    this.reload();
  }

  searchValor(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorialValor = this.varhistorialValorTemp;
    }
    else {
      this.varhistorialValor = this.varhistorialValorTemp.filter((item: any) => {
        if (item.id_valor_flexible.toString().indexOf(filtro) !== -1 ||
            item.valor.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearSearchValor(e: any) {
    if (e.target.value == "") {
      this.varhistorialValor = this.varhistorialValorTemp
    }
  }

  openCrearValor() {
    this.valorFlexibleModal = true;
    this.model.title = "Crear";
    this.model.isLectura = false;
    this.model.tipo = "C";
    
    this.model.varValor = new Model().varValor;
    this.model.varValor.tipo = this.tipo
    this.model.varValor.id_tipo_valor = this.id_tipo_valor;
  }

  closeValorFlexibleModal(bol: any) {
    this.valorFlexibleModal = bol;
    this.getValoresFlexibles(1, this.id_tipo_valor);
  }

  openEditarValor(data: any) {
    this.valorFlexibleModal = true;
    this.model.title = "Actualizar - " + data.valor;
    this.model.isLectura = false;
    this.model.tipo = "U";
    
    this.model.varValor.id_valor_flexible = data.id_valor_flexible;
    this.model.varValor.valor = data.valor;
    this.model.varValor.sigla = data.sigla;
    this.model.varValor.orden = data.orden == null ? 0 : data.orden;
    this.model.varValor.activo = data.activo;
    this.model.varValor.id_valor_flexible_padre = data.id_valor_flexible_padre;
    this.model.varValor.atributo1 = data.atributo1;
    this.model.varValor.atributo2 = data.atributo2;
    this.model.varValor.atributo3 = data.atributo3;
    this.model.varValor.atributo4 = data.atributo4;
    this.model.varValor.id_tipo_valor = data.id_tipo_valor;
    this.model.varValor.tipo = data.tipo;
  }

  saveValor() {
    this.model.varValor.valor = this.model.varValor.valor.toUpperCase();
    this.model.varValor.id_valor_flexible_padre = this.model.varValor.id_valor_flexible_padre == 0 ? 0 : Number(this.model.varValor.id_valor_flexible_padre);

    swal({
      title: 'Valores Flexibles',
      text: "¿Desea crear nuevo registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then((result: any) => {
      if (result.dismiss != "cancel") {
        this.valor.createValoresFlexibles(this.model.varValor).subscribe((data: any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            swal({
              title: 'Valores Flexibles',
              text: response.mensaje,
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              type: 'success',
            }).then((result: any) => {
              this.valorFlexibleModal = false;
              this.getValoresFlexibles(1, this.id_tipo_valor);
            })
          }
        });
      }
    });
  }

  updateValor() {
    this.model.varValor.valor = this.model.varValor.valor.toUpperCase();
    this.model.varValor.id_valor_flexible_padre = this.model.varValor.id_valor_flexible_padre == 0 ? 0 : Number(this.model.varValor.id_valor_flexible_padre);
    
    swal({
      title: 'Valores Flexibles',
      text: "¿Desea actualizar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then((result: any) => {
      if (result.dismiss != "cancel") {
        this.valor.updateValoresFlexibles(this.model.varValor).subscribe((data: any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            swal({
              title: 'Valores Flexibles',
              text: response.mensaje,
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              type: 'success',
            }).then((result: any) => {
              this.valorFlexibleModal = false;
              this.getValoresFlexibles(1, this.id_tipo_valor);
            })
          }
        });
      }
    });
  }

  firstValor() {
    this.model.num_pagv = 1;
    this.getValoresFlexibles(1, this.id_tipo_valor);
  }

  lastValor() {
    this.model.num_pagv = this.model.total_num_pagv;
    this.getValoresFlexibles(this.model.total_num_pagv, this.id_tipo_valor);
  }

  prevValor(page: number) {
    this.model.num_pagv = page;
    this.model.num_pagv--;
    if (this.model.num_pagv == 1) this.model.num_pagv = 1;
    this.getValoresFlexibles(this.model.num_pagv, this.id_tipo_valor);
  }

  nextValor(page: number) {
    this.model.num_pagv = page;
    this.model.num_pagv++;
    if (this.model.num_pagv == this.model.total_num_pagv) this.model.num_pagv = this.model.total_num_pagv;
    this.getValoresFlexibles(this.model.num_pagv, this.id_tipo_valor);
  }
}
