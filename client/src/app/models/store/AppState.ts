export class AppState {

    constructor(public user: any, public loggedIn: boolean, public message: string) {
        user = {};
        loggedIn = false;
        message = "";
    }

}