import { Ajax } from "../core/ajax";
import config from "../core/config";
import { Helpers } from "../core/helpers";
import { LoginManager } from "./LoginManager";

/**
 * @description Permite hacer request authenticadas.
 */

export class AuthFetch extends LoginManager {
  /**
   * @description define el path que sera utilizado por AuthFetch
   * @param string path direccion a donde apunta el fetch. ex: 'api/ejemplo'.
   */

  constructor(path) {
    super();
    path = path.replace(/\/$/, "");
    let token = this.getToken();
    this.headers = {};

    if (token) {
      token = token.token;
      let bearer = `Bearer ${token}`;
      this.headers.Authorization = bearer;
    }
    const url = config.apiUrl;
    this.path = url + "/" + path;
  }
  /**
   * @description obtiene datos de manera asyncrona
   * @param {*} parameters
   * @return Promise
   */
  async get(parameters = {}) {
    const data = await this._fetch(parameters, "get");
    return data;
  }
  /**
   * @description envia por medio del metodo post los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async post(parameters = {}, hasFiles = false) {
    return this._fetch(parameters, "post", hasFiles);
  }
  /**
   * @description envia por medio del metodo put los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async put(parameters = {}) {
    return this._fetch(parameters, "put");
  }
  /**
   * @description envia por medio del metodo delete los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async delete(parameters = {}) {
    return this._fetch(parameters, "delete");
  }
  /**
   * @description Obtiene informacion guardada en cache basada en el path asignado al crear el objeto.
   * @param {*} parameters
   * @returns {}
   */
  local(parameters) {
    const path = this._setPath(parameters);
    const value = localStorage.getItem(path);
    try {
      return JSON.parse(atob(value));
    } catch (e) {
      return null;
    }
  }
  _setPath(parameters) {
    const helpers = new Helpers();
    const path = this.path + "?" + helpers.objectToSerialize(parameters);
    return (path);
  }
  async _fetch(parameters, method, hasFiles) {
    if (!hasFiles) {
      this.headers = {
        ...this.headers,
        "Content-type": "application/json",
      };
    }
    const response = await new Ajax().fetchData(
      this.path,
      parameters,
      method,
      this.headers,
      !hasFiles,
    );
    //this.hasError(response);
    return response;
  }
}
