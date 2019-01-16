import { IUser } from "src/model/user.model";
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions, RequestUpdateUser, RequestUpdateUserSuccess, RequestUpdateUserFail } from "../actions/user.actions";
import { UserService } from "src/services/user-storage/user.service";
import { NotificationService } from "src/services/notification/notification.service";
// import {  } from '../actions/user.actions';

export class UserStateModel {
    uid?: string
    email?: string
    fName?: string
    lName?: string
    photoURL?: string
    tagline?: string
}

@State({
    name: 'user',
    defaults: {}
})
export class UserState {
    // constructor(private userService: TempUserStorageService, private store: Store, private _userService: UserService, private _notification: NotificationService) { }
    constructor(private store: Store, private _userService: UserService, private _notification: NotificationService) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state
    }

    @Action(RequestUserSuccessAction)
    requestSuccessful({ getState, patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState(payload)
    }

    @Action(RequestUserFailedActions)
    requestFailed({ patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState({})
    }

    @Action(RequestUpdateUser)
    updateUserRequest({ getState }: StateContext<UserStateModel>, { user }: RequestUpdateUser) {
        let userState = getState()
        // this._notification.showInfo("Updating user profile...")

        // this._userService.updateUser({ ...user }, userState.id).subscribe(res => {
        //     this.store.dispatch(new RequestUpdateUserSuccess(user))
        // }, err => {
        //     this.store.dispatch(new RequestUpdateUserFail(err))
        // })
    }

    @Action(RequestUpdateUserSuccess)
    updateUserRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestUpdateUserSuccess) {
        this._notification.showSuccess("User updated successfully!")
        patchState(user)
    }

    @Action(RequestUpdateUserFail)
    updateUserRequestFail() {
        this._notification.showError("User did not update!")
    }
}