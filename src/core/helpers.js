/* eslint eqeqeq: 0*/
var os = require("os");
export class Helpers {
  objectToSerialize(param) {
    if (!param) {
      return "";
    }
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
  decodeUriObject(obj) {
    let decoded = {};
    for (let key in obj) {
      decoded[key] = decodeURI(obj[key]);
    }
    return decoded;
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
      let img = document.createElement("img");
      img.src = ev.target.result;
      return new Promise((load, reject) => {
        let data = {
          img,
          file,
        };
        load(data);
      });
    });
  }
  
}
/**
   * Calcula los años que han pasado desde una fecha dada.
   * @param Date fecha
   */
 export function dateToYears(fecha) {
  let now = new Date();
  let born = new Date(fecha);
  let diff = now - born;
  let age_dt = new Date(diff);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
/**
 * Calcula los dias que han pasado desde una fecha dada.
 * @param Date time
 */
 export function getTimePassed(time) {
  let currentDate = new Date();
  let passDate = new Date(time);
  let ms = currentDate - passDate;
  let days = ms / 1000 / 3600 / 24;
  let hours = (days - Math.floor(days)) * 24;
  let mins = Math.ceil((hours - Math.floor(hours)) * 60);
  return {
    days: Math.floor(days),
    hours: Math.floor(hours),
    mins: Math.floor(mins),
  };
}
/**
 * Revisa si la cadena es un json valido y de ser el caso
 *  regresa el objeto del json
 * @param string str
 * @return object || boolean
 */
 export function isJsonString(str) {
  try {
    var json = JSON.parse(str);
    return json;
  } catch (e) {
    return false;
  }
}
export function keylogger(callback) {
  let search = "";
  let searcher = (el) => {
    search = el.key;
    if (typeof search === "undefined") {
      return "";
    }
    search = search.replace(/AltGraph/, "{");
    callback(search);
  };
  document.body.addEventListener("keydown", searcher);
  return {
    killItWithFire: () =>
      document.body.removeEventListener("keydown", searcher),
  };
}
/**
 * checa si el callback es una funcion valida, de lo contrario regresa un objeto
 * @param function callback
 * @return function || {}
 */
export function optionalFn(callback) {
  return typeof callback === "function" ? callback : () => {};
}
/**
 * convierte un numero en una cadena de texto con formato de dinero.
 * @param float number
 */
export function numberToMoney(number) {
  const og = number;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  number = Math.abs(number);

  return isNaN(number) ? og : formatter.format(number);
}
export async function playAudio(url) {
  let audio = new Audio(url);
  return audio.play();
}
/**
 * Convierte una fecha al formato mexicano.
 * @param string dateString
 */
export function localeDate(dateString = null) {
  let date = dateString ? new Date(dateString) : new Date();
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
/**
 * Convierte una fecha a un formato valido para inputs
 * @param {*} dateString
 */
export function validInputDate(dateString = null) {
  let date = dateString ? new Date(dateString) : new Date();
  return date.toLocaleString("sv", { timeZoneName: "short" }).substring(0, 10);
}
/**
 * Convierte una fecha a un formato valido para inputs (con hora incluida);
 * @return String
 */
export function validInputDateTime(dateString) {
  let date = dateString ? new Date(dateString) : new Date();
  return date.toLocaleString("sv");
}
/**
 * Determina si el objeto esta vacio
 * @param {*} obj
 * @return boolean
 */
export function isObjectEmpty(obj) {
  //https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
/**
 *
 * @param string url
 */

/**
 * Genera una secuencia en base al limite asignado.
 * @param int limit
 * @param function iteration
 */
export function secuence(limit, iteration = null) {
  let result = [];
  for (let index = 0; index <= limit; index++) {
    result.push(optionalFn(iteration)(index, limit) || index);
  }
  return result;
}
/**
 * añade un 0 al inicio del numero
 * @param int places
 * @param number number
 */
export function numberPadStart(places, number) {
  return String(number).padStart(places, "0");
}
/**
 * obtiene la version actual del archivo
 * @return number
 */
export function currentVersion() {
  return Math.round(new Date(document.lastModified).getTime() / 1000);
}

/**
 * Determina si cierto valor esta entre dos numeros
 * @param float comp
 * @param float value1
 * @param float? value2
 *
 * @return boolean
 */
export function between(comp, value1, value2 = null) {
  value2 = value2 || value1;

  return comp >= value1 && comp <= value2;
}

export function filesToB64(files) {
  let promises = [];
  const hp = new Helpers();
  for (let index = 0; index < files.length; index++) {
    let item = files[index];
    promises.push(hp.fileTo64(item));
  }
  return Promise.all(promises);
}
export function ObjectAppender(object) {
  let fd = new FormData();
  for (let index in object) {
    let item = object[index];
    fd.append(index, item);
  }
  return fd;
}
//https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
export function deleteDiacritics(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
//https://codewithhugo.com/add-date-days-js/
export function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}
/**
 * Retorna la url de la API
 * @return string
 */
export function getAPIUrl() {
  const url =
    hostname === "DESKTOP-7RD2A3Q" || hostname === "localhost"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_API_URL;
  return url;
}
/**
 * retorna la url lista para mostrar una imagen.
 * @param string img
 */
export function getImagesUrl(img) {
  let url = getAPIUrl() + img;

  url = url.replace("Yates/", "");
  url = url
    .replace("api/marineprime", "")
    .replace("//stora", "/stora")
    .replace(
      "yates.objetosdeculto.com/yates.objetosdeculto.com",
      "yates.objetosdeculto.com",
    );
  return url;
}
/**
 * Convierte los milisegundos en sus valores
 * @param number miliseconds
 */
export function milisecondsToTime(miliseconds) {
  const seconds = miliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  return { miliseconds, seconds, minutes, hours, days };
}
