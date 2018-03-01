class Helpers {
    objectToSerialize(param) {
        let keys = Object.keys(param),
            values = [];
        for (let k in keys) {
            let value = (typeof (param[keys[k]]) == 'object' && Array.isArray(param[keys[k]]) == false) ? JSON.stringify(param[keys[k]]) : param[keys[k]];
            values.push(keys[k] + '=' + value);
        }
        return values.join('&');

    }
    inputsToObject(dom) {
        let inputs = dom.querySelectorAll('input,select,textarea'),
            pos = 0;
        let content = {};
        for (pos; pos < inputs.length; ++pos) {
            if (!inputs[pos].checkValidity()) {
                alert('el campo ' + inputs[pos].name + ' no es valido');
                return false;
            }
            var input = inputs[pos];
            var value;
            if (input.type == 'file') {
                value = input.files;
            }
            else if (input.type == 'checkbox') {
                value = input.checked;
            }
            else {
                if (input.value == '') {
                    continue;
                }
                value = input.value.replace(/,/, '.');
                value = encodeURIComponent(value);
            }
            if (input == undefined || typeof (input) != 'object') {
                continue;
            }
            if (!inputs[pos].checkValidity()) {
                alert('el campo ' + inputs[pos].name + ' no es valido');
                return false;
            }
            if (content[input.name] == undefined) {
                content[input.name] = value;
            }
            else if (typeof (content[input.name]) == 'object') {
                content[input.name].push(value);
            }
            else {
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
    findInArrayOfObjects(arrg, key, value) {
        for (let index in arrg) {
            let item = arrg[index];
            if (item[key] == value) {
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
        return this.fileTo64(file).then((ev) => {
            let img = document.createElement('img');
            img.src = ev.target.result;
            return new Promise((load, reject) => {
                let data = {
                    img,
                    file
                }
                load(data);
            });
        });
    }
    getBodyToken() {
        return document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    }
}
