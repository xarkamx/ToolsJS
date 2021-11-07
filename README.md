# AFIO

Afio is a small and simple solution in vanilla js that allows a quick and clean implementation of basic requests with JWT.

## Instalation

`npm i afio --save`

or in yarn: -`yarn add afio`

## QuickStart

As soon you download the package you should be able to run AuthFetch from afio.

```

import {AuthFetch} from "afio"
const authFetch = new AuthFetch("localPath")
authFetch.get(params)

```

### Set the main api url

    There is two ways to set the baseApiUrl (by default it is localhost:3000).

    in a global set up:

    ```
    import {setBaseApiUrl} from "afio"
    setBaseApiUrl("https://baconipsum.com");
    ```
    or in a local setup:

    ```
    import {AuthFetch} from "afio"
    const authFetch = new AuthFetch("localPath")
    authFetch.url = "https://your-custom-api"

    ```

### Hello world:

```
class DemoTransaction extends BaseTransaction {
    path="/your-path"
}

const request = new DemoTransaction()
request.get(params).then(resp=>{
    // your-code
})

```

the takeaway of this aproach is the BaseTransaction that cotains the following public methods:

1. `async get(params)`.
2. `async put(params,hasFiles)`
3. `async post(params,hasFiles)`
4. `async delete(params)`

That will allow the user to create simple requests that if you have a token asigned will send by default the bearer.

### Storing the token

```
const login = async ()=>{
    const request = CustomLoginTransaction()
    const resp = request.post(yourCredentials)
    CustomLoginTransaction.login({
      expireIn:3600, // expiration time
      token: 'token', // jwt token
      error: null, // any message error
      data:{}, // extra data stored with the token.
    });)
}
```

You may be wondering where this login method is comming from... well BaseTransaction also contains the class LoginManager which contains the followin public methods:

1. `login(result = { expireIn: 3600, error: {}, data: {}, token: null })`
2. `logout()`
3. `onLoginExpire()`
4. `isLogged()`
5. `isExpired()`
6. `getToken()`
