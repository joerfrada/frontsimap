import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SimapComponent } from './simap.component';
import { HomeComponent } from '../modulos/home/home.component';
import { OrdenVueloComponent } from '../modulos/operaciones/orden-vuelo/orden-vuelo.component';
import { RegistroVueloComponent } from '../modulos/operaciones/registro-vuelo/registro-vuelo.component';
import { FormatoaComponent } from '../modulos/operaciones/formatoa/formatoa.component';
import { FormatobComponent } from '../modulos/operaciones/formatob/formatob.component';
import { AuditoriaComponent } from '../modulos/admin/auditoria/auditoria.component';
import { FuncionComponent } from '../modulos/admin/funcion/funcion.component';
import { RolComponent } from '../modulos/admin/rol/rol.component';
import { PrivilegioComponent } from '../modulos/admin/privilegio/privilegio.component';
import { UsuarioComponent } from '../modulos/admin/usuario/usuario.component';
import { ValorFexibleComponent } from '../modulos/parametrizacion/valor-fexible/valor-fexible.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'simap', component: SimapComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'operaciones/orden-vuelo', component: OrdenVueloComponent },
    { path: 'operaciones/registro-vuelo', component: RegistroVueloComponent },
    { path: 'operaciones/riesgo/formato-a', component: FormatoaComponent },
    { path: 'operaciones/riesgo/formato-b', component: FormatobComponent },
    { path: 'seguridad/auditorias', component: AuditoriaComponent },
    { path: 'seguridad/funciones', component: FuncionComponent },
    { path: 'seguridad/grupos-roles', component: RolComponent },
    { path: 'seguridad/privilegios', component: PrivilegioComponent },
    { path: 'seguridad/usuarios', component: UsuarioComponent },
    { path: 'parametrizacion/valores-flexibles', component: ValorFexibleComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimapRoutingModule { }
