import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularHalModule } from 'angular4-hal-aot';
import { ExternalConfigurationService } from './external-configuration-service';

import { AppRoutingModule } from './app-routing.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { HttpErrorInterceptor } from './error-handler/http-error-interceptor';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AdministratorGuard } from './login-basic/administrator.guard';
import { AuthInterceptor } from './login-basic/auth-interceptor';

import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { PlayerService } from './user/player.service';
import { AdminService } from './user/admin.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PlayerListComponent } from './user/user-list/player-list.component';
import { PlayerDetailComponent } from './user/user-detail/player-detail.component';
import { AdminDetailComponent } from './user/user-detail/admin-detail.component';
import { PlayerDeleteComponent } from './user/user-delete/player-delete.component';
import { AdminDeleteComponent } from './user/user-delete/admin-delete.component';
import { PlayerCreateComponent } from './user/user-create/player-create.component';
import { AdminCreateComponent } from './user/user-create/admin-create.component';
import { PlayerEditComponent } from './user/user-edit/player-edit.component';
import { AdminEditComponent } from './user/user-edit/admin-edit.component';
import { UserSearchComponent } from './user/user-search/user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    UserListComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    AdminDetailComponent,
    PlayerDeleteComponent,
    AdminDeleteComponent,
    PlayerCreateComponent,
    AdminCreateComponent,
    PlayerEditComponent,
    AdminEditComponent,
    UserSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    AngularHalModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },

    AuthenticationBasicService, LoggedInGuard, AdministratorGuard, AdminService, PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
