export class UserInfo {
    constructor({ name, description, avatar }) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
        this._userData = {};
    }

    getUserInfo() {
        return this._userData;
    }

    setUserInfo(userData) {
        this._userData = userData;
        this._name.textContent = userData.name;
        this._description.textContent = userData.about;
    }
    
    setUserAvatar(userData) {
        this._userData = userData;
        this._avatar.src = userData.avatar;
    }
}
