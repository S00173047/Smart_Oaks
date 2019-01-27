import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { UsersComponent } from './pages/users/users.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SittingRoomComponent } from './pages/floor-plan/rooms/sitting-room/sitting-room.component';
import { KitchenComponent } from './pages/floor-plan/rooms/kitchen/kitchen.component';
import { DaireBedroomComponent } from './pages/floor-plan/rooms/daire-bedroom/daire-bedroom.component';
import { HallwayComponent } from './pages/floor-plan/rooms/hallway/hallway.component';
import { FloorPlanComponent } from './pages/floor-plan/floor-plan.component';
import { MasterBedroomComponent } from './pages/floor-plan/rooms/master-bedroom/master-bedroom.component';
import { LandingComponent } from './pages/floor-plan/rooms/landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app' },
  { path: 'app', component: ViewComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rooms', component: FloorPlanComponent, children: [
        { path: 'sitting-room', component: SittingRoomComponent },
        { path: 'kitchen', component: KitchenComponent },
        { path: 'hallway', component: HallwayComponent },
        { path: 'landing', component: LandingComponent },
        { path: 'master-bedroom', component: MasterBedroomComponent },
        { path: 'daire-bedroom', component: DaireBedroomComponent }
      ] },
      { path: 'cameras', component: CamerasComponent },
      { path: 'downloads', component: DownloadsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
