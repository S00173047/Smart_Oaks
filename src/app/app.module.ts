import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";

//Firestore/Firebase/FireAuth
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
//Material Design Icons
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

//NGXS
import { NgxsModule } from '@ngxs/store';

//Toastr
import { ToastrModule } from "ngx-toastr";

// Angular material imports
import { AngularMaterialModule } from "./angular-material.module";

//Navigation Components
import { FooterComponent} from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewComponent } from './components/view/view.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserState } from 'src/redux/states/user.state';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { CameraCardComponent } from './cards/camera-card/camera-card.component';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { CameraModalComponent } from './modals/camera-modal/camera-modal.component';
import { env } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ViewComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    CamerasComponent,
    RoomsComponent,
    DownloadsComponent,
    UsersComponent,
    LoginComponent,
    CameraCardComponent,
    CameraModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(env.firebase.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    NgxsModule.forRoot([
      UserState
    ]),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-right",
      maxOpened: 4,
      preventDuplicates: true,
      closeButton: true,
      easing: "ease-in",
      newestOnTop: true,
      autoDismiss: true,
      easeTime: 300
    })
  ],
  providers: [
    CamerasService
  ],
  bootstrap: [AppComponent],
  entryComponents:
  [
    CameraModalComponent
  ]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('account-multiple',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/account-multiple.svg'));
    iconRegistry.addSvgIcon('cctv',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/cctv.svg'));
    iconRegistry.addSvgIcon('download',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/download.svg'));
    iconRegistry.addSvgIcon('floor-plan',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/floor-plan.svg'));
    iconRegistry.addSvgIcon('view-dashboard',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/view-dashboard.svg'));
    iconRegistry.addSvgIcon('logout-variant',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/logout-variant.svg'));
  }
}
