import { UserStateModel } from "../states/user.state";
import { IMonitor } from "src/model/cameras.model";
import { CameraStateModel } from "../states/camera.state";

export class RequestZoneminderAuth {
    static readonly type = '[Cameras] Requesting auth token'

    constructor() {}
}

export class RequestZoneminderSuccess {
    static readonly type = '[Cameras] Request Success'

    constructor(public payload: CameraStateModel) { }
}

export class RequestZoneminderFail {
    static readonly type = '[Cameras] Request Fail'

    constructor(public errorMessage: string) { }
}

// export class RequestUpdateUser {
//     static readonly type = '[User] Request Update User'

//     constructor(public user: Partial<IUser>) { }
// }

// export class RequestUpdateUserSuccess {
//     static readonly type = '[User] Request Update User Success'

//     constructor(public user: Partial<IUser>) { }
// }

// export class RequestUpdateUserFail {
//     static readonly type = '[User] Request Update User Fail'

//     constructor(public errorMessage: string) { }
// }