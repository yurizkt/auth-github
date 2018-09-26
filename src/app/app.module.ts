import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

import { ROUTES } from './routing.module'

import { AuthService } from './auth/auth.service'
import { CallbackComponent } from './callback/callback.component'

import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { ScopeGuardService } from './auth/scope-guard.service'
import { TopoComponent } from './topo/topo.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent,
    TopoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    CommonModule,
    HttpClientModule
  ],
  providers: [ AuthService, ScopeGuardService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
