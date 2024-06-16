import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/accounts/login/login.component';
import { BaseformComponent } from './components/basecomponents/baseform/baseform.component';
import { SingupComponent } from './components/accounts/singup/singup.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { AppsComponent } from './components/apps/apps.component';
import { AuthApiService } from './sdk/api-services/Auth/auth.apiservices';
import { SessionService } from './sdk/services/authServices/session.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseformComponent,
    SingupComponent,
    DashboardComponent,
    AppsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    // AuthApiService,
    // SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
