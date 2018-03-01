class DOM {
    constructor() {
        HTMLElement.prototype.isReadOnly = this.isReadOnly;
        NodeList.prototype.tListener = this.listener;
        HTMLElement.prototype.print = this.print;
    }
    isReadOnly(type) {
        let properties = Object.getOwnPropertyDescriptor(this.__proto__, type);
        if (properties == undefined) {
            return false;
        }
        return (properties.set == undefined);
    }
    listener(type, callback) {
        for (let index = 0; index < this.length; ++index) {
            let item = this[index];
            item.addEventListener(type, callback)
        }
    }
    print() {
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write((this.body != null) ?
            this.body.innerHTML : this.innerHTML);
        iframe.contentWindow.document.close();
        window.setTimeout((ev) => {
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
        }, 500);

    }
}
