class Colors {
    colorByChar(text) {
        let response = '';
        for (let pos in text) {
            let hex = text.charCodeAt(pos).toString(16);
            let sufix = Math.floor(Math.random() * 255).toString(16);
            response += "<span style='color:#" + hex + sufix + sufix + "'>" + text[pos] + "</span>";
        }
        return response;
    }
}
