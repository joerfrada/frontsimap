import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

import { SimapRoutingModule } from './simap-routing.module';
import { SimapComponent } from './simap.component';
import { LoginComponent } from '../auth/login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { ModalComponent } from '../views/modal/modal.component';
import { BreadcrumbComponent } from '../views/breadcrumb/breadcrumb.component';
import { HomeComponent } from '../modulos/home/home.component';
import { AvisoModalComponent } from '../views/aviso-modal/aviso-modal.component';
import { OrdenVueloComponent } from '../modulos/operaciones/orden-vuelo/orden-vuelo.component';
import { RegistroVueloComponent } from '../modulos/operaciones/registro-vuelo/registro-vuelo.component';
import { FormatoaComponent } from '../modulos/operaciones/formatoa/formatoa.component';
import { FormatobComponent } from '../modulos/operaciones/formatob/formatob.component';
import { AuditoriaComponent } from '../modulos/admin/auditoria/auditoria.component';
import { FuncionComponent } from '../modulos/admin/funcion/funcion.component';
import { RolComponent } from '../modulos/admin/rol/rol.component';
import { PrivilegioComponent } from '../modulos/admin/privilegio/privilegio.component';
import { UsuarioComponent } from '../modulos/admin/usuario/usuario.component';


@NgModule({
  declarations: [
    SimapComponent,
    LoginComponent,
    ModalComponent,
    BreadcrumbComponent,
    HomeComponent,
    AvisoModalComponent,
    OrdenVueloComponent,
    RegistroVueloComponent,
    FormatoaComponent,
    FormatobComponent,
    AuditoriaComponent,
    FuncionComponent,
    RolComponent,
    PrivilegioComponent,
    UsuarioComponent,    
  ],
  imports: [
    CommonModule,    
    SimapRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    LayoutModule,
  ]
})
export class SimapModule { }
