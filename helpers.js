/* eslint eqeqeq: 0*/
export class Helpers {
    objectToSerialize(param) {
        let keys = Object.keys(param),
            values = [];
        for (let k in keys) {
            let value =
                typeof param[keys[k]] === "object"
                    ? JSON.stringify(param[keys[k]])
                    : param[keys[k]];
            values.push(keys[k] + "=" + value);
        }
        return values.join("&");
    }
    /**
     * @description convierte todos los inputs dentro de un objeto dom en un objecto de cadenas.
     * @param {*} dom
     * @returns object
     */
    inputsToObject(dom) {
        let inputs = dom.querySelectorAll("input,select,textarea"),
            pos = 0;
        let content = {};
        for (pos; pos < inputs.length; ++pos) {
            if (!inputs[pos].checkValidity()) {
                inputs[pos].value = "";
                inputs[pos].placeholder = "Faltante";
                return false;
            }
            var input = inputs[pos];
            var value;
            if (input.name === "" || input.value === "") {
                continue;
            }
            if (input.type === "file") {
                value = input.files;
                //input.name
            } else if (input.type === "checkbox") {
                value = input.checked;
            } else if (input.type === "radio") {
                if (input.checked === false) {
                    continue;
                }
                value = input.value;
            } else {
                /*if (input.value === '') {
                    continue;
                }*/
                value = input.value.replace(/,/, ".");
                value = encodeURIComponent(value);
            }
            if (input === undefined || typeof input !== "object") {
                continue;
            }
            if (!inputs[pos].checkValidity()) {
                return false;
            }
            if (content[input.name] === undefined) {
                content[input.name] = value;
            } else if (typeof content[input.name] === "object") {
                content[input.name].push(value);
            } else {
                let val = content[input.name];
                content[input.name] = [];
                content[input.name].push(val);
                content[input.name].push(value);
            }
        }
        return content;
    }
    error(msg) {
        document.body.innerHTML = msg.responseText;
        throw msg;
    }
    removeBySelector(selector) {
        let killList = document.querySelectorAll(selector);
        let pos = 0;
        for (pos; pos < killList.length; ++pos) {
            let killItem = killList[pos];
            killItem.parentElement.removeChild(killItem);
        }
    }
    decodeUriObject(obj) {
        let decoded = {};
        for (let key in obj) {
            decoded[key] = decodeURI(obj[key]);
        }
        return decoded;
    }
    /**
     *
     * @param {*} arrg
     * @param {*} key
     * @param {*} value
     */
    findInArrayOfObjects(arrg, key, value) {
        for (let index in arrg) {
            let item = arrg[index];
            if (item[key] === value) {
                return item;
            }
        }
    }
    fileTo64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((load, reject) => {
            reader.onload = load;
            reader.onerror = reject;
        });
    }
    fileToImage(file, dom) {
        return this.fileTo64(file).then(ev => {
            let img = document.createElement("img");
            img.src = ev.target.result;
            return new Promise((load, reject) => {
                let data = {
                    img,
                    file
                };
                load(data);
            });
        });
    }
    getBodyToken() {
        return document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
    }
    merge(...objs) {
        let finalObject = {};
        for (let index in objs) {
            let obj = objs[index];
            for (let keys in obj) {
                if (obj[keys] !== "") {
                    finalObject[keys] = obj[keys];
                }
            }
        }
        return finalObject;
    }
    /**
     * busca un elemento en un arreglo y lo elimina.
     * @param {*} args
     * @param {*} key
     * @param {*} value
     */
    searchAndDestroy(args, key, value) {
        let filter = args.filter((item, index) => {
            return item[key] !== value;
        });
        return filter;
    }
    searchAndInsert(args, where, val, key, insert) {
        return args.map((item, index) => {
            if (item[where] === val) {
                item[key] = insert;
            }
            return item;
        });
    }
    /**
     * Permite buscar cualquier elemento en base a una propiedad.
     * @param {*} args
     * @param string key
     * @param {*} value
     * @returns Array
     */
    searchByKey(args, key, value) {
        if (value === undefined) {
            return [];
        }
        value = `${value}`;
        let values = value.split(/,/);
        let filter = args.filter((item, index) => {
            for (let pos in values) {
                let val = values[pos];
                if (item[key] == val) return true;
            }
            return false;
        });
        return filter;
    }
    /**
     * Permite buscar en un objeto
     * @param {*} args
     * @param {*} query
     */
    searchInObject(args, query) {
        query = query.replace(/ /g, "|");
        return args.filter((item, index) => {
            for (let key in item) {
                if (item[key] === null) {
                    continue;
                }
                let data = item[key].toString();
                let regQuery = RegExp(query, "i");
                let match = data.match(regQuery);
                if (match !== null) {
                    return true;
                }
            }
            return false;
        });
    }

    getObjectTitles(obj) {
        let result = [];
        for (let key in obj) {
            result.push({ key });
        }
        return result;
    }
    flatMultilevel(multiLevelObject) {
        let flatObject = {};
        for (let key in multiLevelObject) {
            let item = multiLevelObject[key];
            flatObject[key] = item;
            flatObject = this.merge(flatObject, item);
        }
        return flatObject;
    }
    searchAndGetIndex(arr, key, query) {
        for (let index in arr) {
            let item = arr[index];
            if (item[key] === query) {
                return index;
            }
        }
        return -1;
    }
    searchCommonAndUpdate(contentID, newData, currentData) {
        let data = this.flatMultilevel(newData);
        let index = this.searchAndGetIndex(currentData, "id", contentID);
        for (let key in data) {
            currentData[index][key] =
                currentData[index][key] !== undefined
                    ? currentData[index][key]
                    : data[key];
        }
        return currentData;
    }
    splitOnUpperCase($text) {
        $text = $text.split(/(?=[A-Z])/);
        return $text.join(" ");
    }
    /**
     * @description Obtiene el ultimo item del array
     * @param {array} arr
     */
    lastItem(arr) {
        return arr[arr.length - 1];
    }
    /**
     * @description Ordena un objeto por alguno de sus elementos.
     * @param {object} data
     * @param {string} by
     * @param {string} direction asc|desc
     */
    orderBy(data, by, direction = "asc") {
        data = this.cloneArray(data);
        return data.sort((a, b) => {
            if (a[by] === null) {
                return 1;
            }
            if (b[by] === null) {
                return 1;
            }
            if (typeof a[by] !== "number") {
                return direction === "asc"
                    ? a[by].localeCompareArrays(b[by])
                    : b[by].localeCompareArrays(a[by]);
            }
            return direction === "asc" ? a[by] - b[by] : b[by] - a[by];
        });
    }
    cloneArray(data) {
        data = { ...data };
        data = Object.values(data);
        return data;
    }
    dateToYears(fecha) {
        let now = new Date();
        let born = new Date(fecha);
        let diff = now - born;
        let age_dt = new Date(diff);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    /**
     * @description Separa una cadena con formato de Path en sus componente individuales
     * @param {string} path
     * @returns {object} {folder,fileName,ext}
     */
    pathSlicer(path) {
        let fileName = this.lastItem(path.split(/\//));
        let ext = this.lastItem(fileName.split(/\./));
        let folder = path.replace(fileName, "");
        folder = folder.replace(/\/\//, "/");
        return { fileName, ext, folder };
    }
    /**
     * Revisa si la cadena es un json valido y de ser el caso
     *  regresa el objeto del json
     * @param string str
     * @return object || boolean
     */
    isJsonString(str) {
        try {
            var json = JSON.parse(str);
            return json;
        } catch (e) {
            return false;
        }
    }
    /* @description Compara dos arreglos y devuelve true si son iguales
     * @param {array} array1
     * @param {array} array2
     * @returns boolean
     */
    compareArrays(array1, array2, key = null) {
        if (!array1 || !array2) return;

        let result;

        array1.forEach((e1, i) =>
            array2.forEach(e2 => {
                let item1 = e1;
                if (key) {
                    item1 = e1[key];
                }

                if (e1.length > 1 && e2.length) {
                    result = this.compareArrays(e1, e2);
                } else if (item1 !== e2) {
                    result = false;
                } else {
                    result = true;
                }
            })
        );

        return result;
    }
    keylogger() {
        let search = "";
        document.body.addEventListener("keyup", el => {
            if (el.key === "Enter") {
                search = "";
                return false;
            }
            search += String.charCodeAt(el.keyCode);
            search = search.replace(/AltGraphDead/, "{");
            search = search.replace(/AltGraphç/, "}");
            search = search.replace(/Shift2/, '"');
            search = search.replace(/!Shift@/, '1"');
            search = search.replace(/Shift@/, '"');
            search = search.replace(/&/, "6");
            //this.willSearch(search);
        });
    }
}
