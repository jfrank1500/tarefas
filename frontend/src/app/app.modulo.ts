import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { TableModule } from 'primeng/table';
import {
  ButtonModule, CalendarModule, ConfirmDialogModule, ConfirmationService,
  DialogModule, DropdownModule, InputTextModule, PanelModule, TabMenuModule, TabViewModule, ToolbarModule, MessageService, InputMaskModule,
  FileUploadModule,
  PaginatorModule,
  PasswordModule, SharedModule, ScheduleModule
} from 'primeng/primeng';
import { ToastModule } from 'primeng/components/toast/toast';

import { AppComponent } from './app.componente';
import { UsuarioComponente, UsuarioServico } from './usuarios';
import { TimeoutServico } from './base';
import { LoginComponente } from './login';
import { InicioComponente } from './inicio';
import { INICIO_URL, USUARIO_URL, TAREFA_URL, PROJETO_URL } from '../../../config/config.comum';
import { TabelaComponente } from './base/tabela.component';
import { TarefaComponente, TarefaServico } from './tarefas';
import { ProjetoComponente, ProjetoServico } from './projetos';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponente, pathMatch: 'full' },
    { path: INICIO_URL, component: InicioComponente, pathMatch: 'full' },
    { path: USUARIO_URL, component: UsuarioComponente, pathMatch: 'full' },
    { path: PROJETO_URL, component: ProjetoComponente, pathMatch: 'full' },
    { path: TAREFA_URL, component: TarefaComponente, pathMatch: 'full' },
    { path: '**', redirectTo: '/' }
  ])],
  exports: [RouterModule],
  providers: [
    ConfirmationService,
    TimeoutServico, MessageService,
    UsuarioServico, ProjetoServico, TarefaServico
  ]
})
export class AppRoteamentoModule { }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponente,
    InicioComponente,
    UsuarioComponente,
    ProjetoComponente,
    TarefaComponente,
    TabelaComponente,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, ButtonModule,
    ConfirmDialogModule, CalendarModule, DialogModule, DropdownModule,
    HttpClientModule, InputTextModule, InputMaskModule, NgHttpLoaderModule, PanelModule, PasswordModule,
    TableModule, TabMenuModule, TabViewModule, ToastModule, ToolbarModule,

    FileUploadModule, PaginatorModule, SharedModule, ScheduleModule,

    AppRoteamentoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
