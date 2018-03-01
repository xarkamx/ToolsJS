class Ajax extends Helpers {
    async fetchData(path, parameters = {}, method = "get", headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }) {
        parameters = this.objectToSerialize(parameters);
        let args = {
            headers
        }
        if (method.toLowerCase() == 'get') {
            path += '?' + parameters;
            parameters = '';
        }
        else {
            args.body = parameters;
        }
        args.method = method;
        let data = await fetch(path, args);
        try {
            return await data.json();
        }
        catch (e) {
            let data = await fetch(path, args);
            return await data.text();
        }

    }
}
