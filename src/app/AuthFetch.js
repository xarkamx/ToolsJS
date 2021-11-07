import { Ajax } from "../core/ajax";
import config from "../core/config";
import { Helpers } from "../core/helpers";
import { LoginManager } from "./LoginManager";

let apiUrl = config.apiUrl;
export function setBaseApiUrl(url) {
  apiUrl = url || apiUrl;
}
export class AuthFetch extends LoginManager {
  /**
   * @description define el path que sera utilizado por AuthFetch
   * @param string path direccion a donde apunta el fetch. ex: 'api/ejemplo'.
   */

  constructor(path) {
    super();
    path = path.replace(/\/$/, "");
    let authObject = this.getToken();
    this.headers = {};

    if (authObject) {
      let token = authObject.token;
      let bearer = `Bearer ${token}`;
      this.headers.Authorization = bearer;
    }
    this.url = apiUrl;
    this.path = path;
  }
  get fullPath() {
    return `${this.url}/${this.path}`;
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
    return path;
  }
  set basePath(path) {
    this.path = path;
  }
  async _fetch(parameters, method, hasFiles) {
    if (!hasFiles) {
      this.headers = {
        ...this.headers,
        "Content-type": "application/json",
      };
    }
    const response = await new Ajax().fetchData(
      this.fullPath,
      parameters,
      method,
      this.headers,
      !hasFiles
    );
    //this.hasError(response);
    return response;
  }
}
