
export class LoginManager {
  /**
   * @description Valida y almacena el token de autenticacion
   * @param {*} result
   */
  login(result = { expireIn: 3600, error: {}, data: {}, token: null }) {
    this.hasError(result);
    result.expired = this.setExpirationDate(result.expireIn);
    localStorage.setItem(("token"), (JSON.stringify(result)));
    return this;
  }
  logout() {
    localStorage.removeItem(("token"));
  }
  /**
   * @description Revisa si el request retorno algun error.
   * @param {} result
   * @returns void
   */
  hasError(result) {
    if (!result.data) {
      result.data = {};
    }
    if (result.error) {
      localStorage.removeItem(("token"));
      throw { code: 403, message: result.error };
    }
  }
  /**
   * @description Determina la fecha de expiracion del login
   * @param int expiredIn (seconds)
   * @return Date
   */
  setExpirationDate(expiredIn) {
    let now = new Date();
    now.setSeconds(now.getSeconds() + expiredIn);
    return now;
  }
  /**
   * @description Evento que se dispara cuando el login expira.
   */
  onLoginExpire() {
    let token = this.getToken();
    if (!token) {
      return false;
    }
    return new Promise((load, fail) => {
      const interval = setInterval(() => {
        if (!this.isLogged()) {
          load();
          clearInterval(interval);
        }
      }, 500);
    });
  }
  /**
   * @description revisa si el token ha expirado
   */
  isExpired() {
    let auth = this.getToken();
    let expiredDate = new Date(auth.expired);
    return new Date() > expiredDate;
  }
  /**
   * @description obtiene la informacion del token guardada en localstorage
   */
  getToken() {
    try {
      return JSON.parse((localStorage.getItem(("token"))));
    } catch (e) {
      return null;
    }
  }
  /**
   * @description revisa si el usuario esta loggeado.
   */
  isLogged() {
    return this.getToken() != null && !this.isExpired();
  }
  /**
   * Revisa si el usuario registrado tienen el permiso activo.
   * @param array[number] permission
   */
  hasPermission(profiles) {
    if (!this.isLogged()) {
      return false;
    }
    try {
      const profile = this.getToken().user.profileID;
      return profiles.includes(profile);
    } catch (error) {
      this.logout();
      return false;
    }
  }
}
