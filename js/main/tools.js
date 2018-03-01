'use strict';
class Tools {
    constructor() {
        this.dom = new DOM();
        this.ajax = new Ajax();
        this.templates = new Templates();
        this.helpers = new Helpers();

    }
    createTable(path, pn, tn, events) {
        this.ajax.postData(path);
        this.ajax.onEnd = (response) => {
            events.response = response;
            this.templates.fillTemplate(pn, tn, response, events);
        }
    }
    addTrToTable(path, table) {
        if (document.querySelector('.details') != null) {
            this.helpers.removeBySelector('.details');
            return false;
        }
        let tr = document.createElement('tr');
        let content = this.ajax.import(path);
        tr.innerHTML = '<td colspan=6>' + content + '</td>';
        tr.classList.add('details');
        table.insertAdjacentElement('afterend', tr);
        return tr;
    }
    runTime(args) {
        setInterval((ev) => {
            let dom = args.dom;
            let data = this.helpers.inputsToObject(dom);
            if (this.data == data) {
                return false;
            }
            this.data = data;
            let fn;
            for (fn in data) {
                let value = data[fn];
                if (typeof args[fn] == 'function') {
                    args[fn](value, args.callback);
                }
            }
        }, 0);

    }
}
