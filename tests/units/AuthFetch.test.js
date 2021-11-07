import { AuthFetch } from "../../src/app/AuthFetch";
import { LoginManager } from "../../src/app/LoginManager";
import config from "../../src/core/config";
import { mockLocalStorage } from "../utils/utils";

mockLocalStorage()
describe('Should be able to to make requests with bearer',()=>{

  it('Should be able to make a request with bearer',()=>{
    let lm = new LoginManager();
    lm=lm.login({
      expireIn:3600,
      token: 'token',
      error: null,
      data:{},
    });
    const fetch = new AuthFetch("api/v1/user");
    expect(fetch.path).toBe(config.apiUrl+"/api/v1/user");
    expect(fetch.headers.Authorization).toBe('Bearer token');
  });
})