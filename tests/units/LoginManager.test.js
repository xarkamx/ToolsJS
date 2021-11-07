import { LoginManager } from "../../src/app/LoginManager";
import { mockLocalStorage } from "../utils/utils";
mockLocalStorage();

describe('LoginManager', ()=> {
  it('should be defined', ()=> {
    expect(LoginManager).toBeDefined();
  })
  it('should be able to login', ()=> {
    let lm = new LoginManager();
    lm=lm.login({
      expireIn:3600,
      token: 'token',
      error: null,
      data:{},
    });
    expect(lm.isLogged()).toBe(true);
  })
  it('should be able to logout', ()=> {
    let lm = new LoginManager();
    lm=lm.login({
      expireIn:3600,
      token: 'token',
      error: null,
      data:{},
    });
    expect(lm.isLogged()).toBe(true);
    lm.logout();
    expect(lm.isLogged()).toBe(false);
  })
  it('should be able to get token', ()=> {
    let lm = new LoginManager();
    lm=lm.login({
      expireIn:3600,
      token: 'token',
      error: null,
      data:{},
    });
    expect(lm.getToken().token).toBe('token');
  })
  it('should throw an exeption if the login fails',()=>{
    let lm = new LoginManager();
    expect(()=>{
      lm.login({
        expireIn:3600,
        token: null,
        error: 'error',
        data:{},
      });
    }).toThrow();
  })
})