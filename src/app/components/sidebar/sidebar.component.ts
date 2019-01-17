import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/services/notification/notification.service';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';
// import { NotificationService } from 'src/services/notifications/notification.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { 
        path: 'dashboard', 
        title: 'Dashboard', 
        icon: 'view-dashboard', 
        class: '' 
    },
    { 
        path: 'rooms', 
        title: 'Rooms', 
        icon: 'floor-plan', 
        class: '' 
    },
    { 
        path: 'cameras', 
        title: 'Cameras', 
        icon: 'cctv', 
        class: '' 
    },
    { 
        path: 'downloads', 
        title: 'Downloads', 
        icon: 'download', 
        class: '' },
    { 
        path: 'users', 
        title: 'Users', 
        icon: 'account-multiple', 
        class: '' 
    }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    // @Select(UserState.getUser) user$: Observable<IUser>
    menuItems: any[];
    fName: string = "Anon";

    constructor(
        private _auth: AuthService,
        private _notification: NotificationService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    logOut() {
        this._auth.signOut();
    }
}