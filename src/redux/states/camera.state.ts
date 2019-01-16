import { State, Selector, Store, StateContext, Action } from '@ngxs/store';
import { NotificationService } from "src/services/notification/notification.service";
import { CamerasService } from "src/services/cameras/cameras.service";
import { IMonitor, IMonitorInfo, IMonitorStatus } from "src/model/cameras.model";
import { RequestZoneminderSuccess, RequestZoneminderFail, RequestZoneminderAuth } from '../actions/camera.actions';
// import {  } from '../actions/user.actions';

export class CameraStateModel {
    authParam?: string
}

@State({
    name: 'camera',
    defaults: {}
})
export class CameraState {
    // constructor(private userService: TempUserStorageService, private store: Store, private _userService: UserService, private _notification: NotificationService) { }
    constructor(private store: Store, private _camService: CamerasService, private _notification: NotificationService) { }

    @Selector()
    static getZoneminder(state: CameraState) {
        return state
    }

    @Action(RequestZoneminderAuth)
    requestAuth({ patchState }: StateContext<CameraStateModel>) {
        this._camService.login();
        let response =  this._camService.authParam
        let newState: Partial<CameraStateModel> =
        {
            authParam: response
        }
        patchState(newState)
    }
//     @Action(RequestZoneminderSuccess)
//     requestSuccessful({ getState, patchState }: StateContext<CameraStateModel>, { payload }: RequestZoneminderSuccess) {
//         this._notification.showError("Test", "Test")
//         patchState(payload)
//     }

//     @Action(RequestZoneminderFail)
//     requestFailed({ patchState }: StateContext<CameraStateModel>, { errorMessage }: RequestZoneminderFail) {
//         this._notification.showError("Error getting camera state", errorMessage)
//     }
// }
}