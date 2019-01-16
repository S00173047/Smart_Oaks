import { IUser } from "src/model/user.model";
import { UserStateModel } from "../states/user.state";

export class RequestUserSuccessAction {
    static readonly type = '[User] Request Success'

    constructor(public payload: IUser) { }
}

export class RequestUserFailedActions {
    static readonly type = '[User] Request Fail'

    constructor(public errorMessage: string) { }
}

export class RequestUpdateUser {
    static readonly type = '[User] Request Update User'

    constructor(public user: Partial<IUser>) { }
}

export class RequestUpdateUserSuccess {
    static readonly type = '[User] Request Update User Success'

    constructor(public user: Partial<IUser>) { }
}

export class RequestUpdateUserFail {
    static readonly type = '[User] Request Update User Fail'

    constructor(public errorMessage: string) { }
}