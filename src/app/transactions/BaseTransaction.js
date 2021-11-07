import { AuthFetch } from "../AuthFetch";
export class BaseTransaction {
  async get(values) {
    let fetch = new AuthFetch(`${this.path}`);
    let data = await fetch.get(values);
    return data;
  }
  async show(id) {
    let fetch = new AuthFetch(`${this.path}/${id}`);
    let data = await fetch.get();
    return data;
  }
  async post(content = {}, hasFiles = true) {
    let fetch = new AuthFetch(`${this.path}`);
    let { code, data } = await fetch.post(content, hasFiles);
    if (code >= 300) {
      console.log("algo salio mal");
    }
    return { data, code };
  }
  async put(id, content = {}) {
    let fetch = new AuthFetch(`${this.path}/${id}`);
    return fetch.put(content);
  }
  async delete(id) {
    let fetch = new AuthFetch(`${this.path}/${id}`);
    return fetch.delete();
  }
}
