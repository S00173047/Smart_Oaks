import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import 'hammerjs';

//Angular Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ToastrModule } from 'ngx-toastr';

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
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { CameraCardComponent } from './cards/camera-card/camera-card.component';
import { CamerasService } from 'src/services/cameras/cameras.service';
import { CameraModalComponent } from './modals/camera-modal/camera-modal.component';
import { env } from 'src/environments/environment';
import { PhilipsHueService } from 'src/services/philips-hue/philips-hue.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotificationService } from 'src/services/notification/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SittingRoomComponent } from './pages/floor-plan/rooms/sitting-room/sitting-room.component';
import { KitchenComponent } from './pages/floor-plan/rooms/kitchen/kitchen.component';
import { HallwayComponent } from './pages/floor-plan/rooms/hallway/hallway.component';
import { DaireBedroomComponent } from './pages/floor-plan/rooms/daire-bedroom/daire-bedroom.component';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { HueLightCardComponent } from './cards/hue-light-card/hue-light-card.component';
import { HueGroupCardComponent } from './cards/hue-group-card/hue-group-card.component';
import { MasterBedroomComponent } from './pages/floor-plan/rooms/master-bedroom/master-bedroom.component';
import { LightModalComponent } from './modals/light-modal/light-modal.component';
import { MapComponent } from './pages/floor-plan/map/map.component';
import { LandingComponent } from './pages/floor-plan/rooms/landing/landing.component';
import { WeatherCardComponent } from './cards/weather-card/weather-card.component';
import { ThermostatCardComponent } from './cards/thermostat-card/thermostat-card.component';
import { UtilityComponent } from './pages/floor-plan/rooms/utility/utility.component';
import { AuthService } from 'src/services/auth/auth.service';
import { GoogleCastService } from 'src/services/google-cast/google-cast.service';
import { NetatmoService } from 'src/services/netatmo/netatmo.service';
import { UserService } from 'src/services/user-storage/user.service';

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
    DownloadsComponent,
    UsersComponent,
    LoginComponent,
    CameraCardComponent,
    CameraModalComponent,
    SettingsComponent,
    SittingRoomComponent,
    KitchenComponent,
    HallwayComponent,
    DaireBedroomComponent,
    FloorPlanComponent,
    HueLightCardComponent,
    HueGroupCardComponent,
    MasterBedroomComponent,
    LightModalComponent,
    MapComponent,
    LandingComponent,
    WeatherCardComponent,
    ThermostatCardComponent,
    UtilityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(env.firebase.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
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
    }),
    NgxsModule.forRoot([
      UserState
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    CamerasService,
    GoogleCastService,
    NetatmoService,
    NotificationService,
    PhilipsHueService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
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
    iconRegistry.addSvgIcon('settings',sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/settings.svg'));
  }
}
