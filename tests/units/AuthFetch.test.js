import { AuthFetch } from "../../src/app/AuthFetch";
import { LoginManager } from "../../src/app/LoginManager";
import config from "../../src/core/config";
import { mockLocalStorage } from "../utils/utils";
import { setBaseApiUrl } from "./../../src/app/AuthFetch";

mockLocalStorage();
global.fetch = async (path, ...data) => {
  console.log(path, data);
};
describe("Should be able to to make requests with bearer", () => {
  it("Should be able to make a request with bearer", () => {
    let lm = new LoginManager();
    lm = lm.login({
      expireIn: 3600,
      token: "token",
      error: null,
      data: {},
    });
    const fetch = new AuthFetch("api/v1/user");
    expect(fetch.fullPath).toBe(config.apiUrl + "/api/v1/user");
    expect(fetch.headers.Authorization).toBe("Bearer token");
  });

  it("Should be able to change the base api url", async () => {
    setBaseApiUrl("https://baconipsum.com");
    const fetch = new AuthFetch("api");
    await fetch.get({ type: "meat-and-filler" });
    expect(fetch.fullPath).toBe("https://baconipsum.com/api");
  });
});
