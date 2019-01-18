import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { UsersComponent } from './pages/users/users.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SittingRoomComponent } from './pages/rooms/sitting-room/sitting-room.component';
import { KitchenComponent } from './pages/rooms/kitchen/kitchen.component';
import { DaireBedroomComponent } from './pages/rooms/daire-bedroom/daire-bedroom.component';
import { HallwayComponent } from './pages/rooms/hallway/hallway.component';
import { FloorPlanComponent } from './pages/rooms/floor-plan/floor-plan.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app' },
  { path: 'app', component: ViewComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rooms', component: RoomsComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'floor-plan'},
        { path: 'floor-plan', component: FloorPlanComponent },
        { path: 'sitting-room', component: SittingRoomComponent },
        { path: 'kitchen', component: KitchenComponent },
        { path: 'hallway', component: HallwayComponent },
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
