import * as dFns from "date-fns";
import * as dFnsTZ from "date-fns-tz";
import * as Rut from "rut.js";

export const dateFNS = dFns;
export const dateFNSTZ = dFnsTZ;

export const logNormal = (type: string, message: string): void => {
  const dateNow = getNow("yyyy-MM-dd HH:mm:ss", "America/Santiago");
  console.log(`[${dateNow}] [${type}] ${message}`);
}

/**
 *
 * @param date
 * @param mod
 * @param num
 * @param op
 * @returns
 */
export const modifyDate = (
  date: string | Date,
  mod: "min" | "day" | "year" | "sec" | "mon" | "wee" | "hou" = "day",
  num: number,
  op: "add" | "sub"
): Date => {
  if (typeof date === "string") {
    date = stringToDate(date)!;
  }

  if (mod === "min") {
    if (op === "add") {
      date = dateFNS.addMinutes(date, num);
    } else {
      date = dateFNS.subMinutes(date, num);
    }
  } else if (mod === "year") {
    if (op === "add") {
      date = dateFNS.addYears(date, num);
    } else {
      date = dateFNS.subYears(date, num);
    }
  } else if (mod === "sec") {
    if (op === "add") {
      date = dateFNS.addSeconds(date, num);
    } else {
      date = dateFNS.subSeconds(date, num);
    }
  } else if (mod === "mon") {
    if (op === "add") {
      date = dateFNS.addMonths(date, num);
    } else {
      date = dateFNS.subMonths(date, num);
    }
  } else if (mod === "wee") {
    if (op === "add") {
      date = dateFNS.addWeeks(date, num);
    } else {
      date = dateFNS.subWeeks(date, num);
    }
  } else if (mod === "hou") {
    if (op === "add") {
      date = dateFNS.addHours(date, num);
    } else {
      date = dateFNS.subHours(date, num);
    }
  } else {
    if (op === "add") {
      date = dateFNS.addDays(date, num);
    } else {
      date = dateFNS.subDays(date, num);
    }
  }

  return date;
};
/**
 *
 * @param format
 * @param tz
 * @return stringDate
 * @description Retorna fecha actual, por defecto en zona horaria UTC
 */
export const getNow = (
  format: string = "yyyy-MM-dd HH:mm:ss",
  tz: string = "UTC"
): string => {
  return dateFNSTZ.formatInTimeZone(new Date(), tz, format);
};

export const dateToString = (
  date: Date,
  format: string = "yyyy-MM-dd HH:mm:ss"
): string => {
  return dateFNSTZ.format(date, format);
};

export const utcToTZ = (
  date: Date,
  tz: string = "America/Santiago",
  format: string = "yyyy-MM-dd HH:mm:ss"
): string => {
  return dateFNSTZ.formatInTimeZone(date, tz, format);
};

export const toTZUTC = (date, strFormat = "yyyy-MM-dd HH:mm:ss"): string => {
  return dateFNSTZ.formatInTimeZone(date, "UTC", strFormat);
};

export const checkDates = (
  date1Str: string,
  date2Str: string,
  format: string = "yyyy-MM-dd HH:mm:ss"
): number => {
  const date1 = dateFNS.parse(date1Str, format, new Date());
  const date2 = dateFNS.parse(date2Str, format, new Date());
  if (dateFNS.isAfter(date1, date2)) {
    return 1;
  } else if (dateFNS.isAfter(date2, date1)) {
    return 2;
  } else if (dateFNS.isEqual(date2, date1)) {
    return 3;
  } else {
    return 4;
  }
};

export const dateToFormat = (
  date: string,
  formatTo: string = "yyyy-MM-dd"
): string => {
  let dateReturn = date;
  try {
    let time = "";
    if (date.indexOf(" ") !== -1) {
      const [d, h] = date.split(" ");
      time = ` ${h}`;
      date = d;
    }

    formatTo = formatTo.toLowerCase();

    if (date.indexOf("-") !== -1) {
      let [day, month, year] = date.split("-");
      const yearF = year;
      year = day.length === 4 ? day : year;
      day = day.length === 4 ? yearF : day;
      formatTo = formatTo.replace("dd", day);
      formatTo = formatTo.replace("mm", month);
      formatTo = formatTo.replace("yyyy", year);
      dateReturn = formatTo + time;
    } else if (date.indexOf("/") !== -1) {
      let [day, month, year] = date.split("/");
      const yearF = year;
      year = day.length === 4 ? day : year;
      day = day.length === 4 ? yearF : day;
      formatTo = formatTo.replace("dd", day);
      formatTo = formatTo.replace("mm", month);
      formatTo = formatTo.replace("yyyy", year);
      dateReturn = formatTo + time;
    }
  } catch (e) {
    console.log(e, "dateToFormat");
  }
  return dateReturn;
};

export const stringToDate = (date: string): Date | null => {
  let dateReturn = date;
  try {
    let time = "23:59:59";
    if (date.indexOf(" ") !== -1) {
      const [d, h] = date.split(" ");
      time = h;
      date = d;
    } else if (date.indexOf("T") !== -1) {
      const [d, ht] = date.split("T");
      const [h, t] = ht.split(".");
      time = h;
      date = d;
    }

    let formatTo = `y-m-dT${time}`;
    const dateAux = getNow("yyyy-MM-dd").split("-");

    if (date.indexOf("-") !== -1) {
      let [day, month, year] = date.split("-");
      const yearF = year;
      year = day.length === 4 ? day : year;
      day = day.length === 4 ? yearF : day;
      formatTo = formatTo.replace("d", year !== "0000" ? day : dateAux[2]);
      formatTo = formatTo.replace("m", year !== "0000" ? month : dateAux[1]);
      formatTo = formatTo.replace("y", year !== "0000" ? year : dateAux[0]);
      dateReturn = formatTo;
    } else if (date.indexOf("/") !== -1) {
      let [day, month, year] = date.split("/");
      const yearF = year;
      year = day.length === 4 ? day : year;
      day = day.length === 4 ? yearF : day;
      formatTo = formatTo.replace("d", year !== "0000" ? day : dateAux[2]);
      formatTo = formatTo.replace("m", year !== "0000" ? month : dateAux[1]);
      formatTo = formatTo.replace("y", year !== "0000" ? year : dateAux[0]);
      dateReturn = formatTo;
    }

    return new Date(dateReturn);
  } catch (e) {
    logNormal("ERROR", e.message);
    return null;
  }
};

export const replaceAll = (
  string: string,
  search: string,
  replace: string
): string => {
  return string.split(search).join(replace);
};

export const objectToForm = (data: object): FormData => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return formData;
};

export const mesANombre = (mes: number): string => {
  let mesDetalle = "S/I";

  if (mes === 1) {
    mesDetalle = "Enero";
  } else if (mes === 2) {
    mesDetalle = "Febrero";
  } else if (mes === 3) {
    mesDetalle = "Marzo";
  } else if (mes === 4) {
    mesDetalle = "Abril";
  } else if (mes === 5) {
    mesDetalle = "Mayo";
  } else if (mes === 6) {
    mesDetalle = "Junio";
  } else if (mes === 7) {
    mesDetalle = "Julio";
  } else if (mes === 8) {
    mesDetalle = "Agosto";
  } else if (mes === 9) {
    mesDetalle = "Septiembre";
  } else if (mes === 10) {
    mesDetalle = "Octubre";
  } else if (mes === 11) {
    mesDetalle = "Noviembre";
  } else if (mes === 12) {
    mesDetalle = "Diciembre";
  }

  return mesDetalle;
};

/* export const numberFormat = (
  number: number,
  decimals: number,
  dec_point: string,
  thousands_sep: string
): number => {
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec);
      return Math.round(n * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return isNaN(Number(s.join(dec))) ? 0 : Number(s.join(dec));
}; */

export const padStart = (
  number: number,
  digits: number = 2,
  emptyDigit: number = 0
): string => {
  try {
    let length = 0;
    let n = Math.abs(number);
    let absoluteNumber = n;
    do {
      n /= 10;
      length++;
    } while (n >= 1);
    const prefix = Array(Math.max(digits - length + 1, 0)).join(
      emptyDigit.toString()
    );
    return number < 0 ? `-${prefix}${absoluteNumber}` : prefix + number;
  } catch (e) {
    return number.toString();
  }
};

export const formatString = (
  value: string | number,
  pattern: string
): string => {
  let i = 0;
  const v = value.toString();
  return pattern.replace(/#/g, (_) => v[i++]);
};

export const validateRut = (rut: string): boolean => {
  return Rut.validate(rut);
};

export const getDigitRut = (rut: string): string => {
  return Rut.getCheckDigit(rut);
};

export const formatRut = (rut: string): string => {
  rut = Rut.clean(rut);
  return Rut.format(rut);
};

export const cleanRut = (rutStr: string): string[] => {
  const rut = formatRut(rutStr).split("-");
  const ruti = rut[0].replace(/\./g, "");
  return [ruti, rut[1]];
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/* export const random = (long: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < long; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}; */

/* export const randomEspecial = (long: number): string => {
  let text = "";
  const possible = "$&.,!@*-_+";
  for (let i = 0; i < long; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}; */

export const onlyLetter = (text: string, type: string = "up"): string => {
  let newText = "";
  let abc = "";
  if (type === "up") {
    abc = "ABCDEFGHIJKLMNñOPQRSTUVWXYZÁÉÍÓÚ ";
  } else if (type === "low") {
    abc = "abcdefghijklmnñopqrstuvwxyzáéíóú ";
  } else {
    abc = "ABCDEFGHIJKLMNñOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚáéíóú ";
  }

  for (let i = 0; i < text.length; i++) {
    if (abc.indexOf(text[i]) > -1) {
      newText = newText + text[i];
    }
  }

  return newText;
};

export const onlyString = (text: string, type: string = "up"): string => {
  let newText = "";
  let abc = "";
  if (type === "up") {
    abc = "ABCDEFGHIJKLMNñOPQRSTUVWXYZÁÉÍÓÚ,.-_1234567890 ";
  } else if (type === "low") {
    abc = "abcdefghijklmnñopqrstuvwxyz,.-_1234567890 ";
  } else {
    abc =
      "ABCDEFGHIJKLMNñOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚáéíóú,.-_1234567890 ";
  }

  for (let i = 0; i < text.length; i++) {
    if (abc.indexOf(text[i]) > -1) {
      newText = newText + text[i];
    }
  }

  return newText;
};

export const onlyDigits = (digitts: string, text: string): string => {
  let newText = "";

  for (let i = 0; i < text.length; i++) {
    if (digitts.indexOf(text[i]) > -1) {
      newText = newText + text[i];
    }
  }

  return text.length === 0 ? " " : newText;
};

export const isValidUrl = (url: string): boolean => {
  if (
    url.indexOf("http://localhost") !== -1 ||
    url.indexOf("https://localhost") !== -1
  ) {
    return true;
  }
  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return (
    res !== null &&
    (url.indexOf("http://") > -1 || url.indexOf("https://") > -1)
  );
};

export const inArray = (
  value: string | number,
  arreglo: string[] | number[]
): boolean => {
  let retorno = false;
  try {
    if (arreglo.length > 0) {
      arreglo.forEach((rowValue) => {
        if (rowValue === value) retorno = true;
      });
    }
  } catch (e) {
    logNormal("ERROR", `inArray: ${e}`);
    retorno = false;
  }
  return retorno;
};

/* export const randomChar = (long: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$.,*-_!#%&/?+;¿";

  for (let i = 0; i < long; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}; */

/* export const randomString = (long: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < long; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}; */

/* export const randomInt = (long: number): number => {
  let text = "";
  const possible = "0123456789";

  for (let i = 0; i < long; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return Number(text);
}; */

export const capitalizeWords = (string: string): string => {
  const arr = string.split(" ");
  let word = "";
  arr.forEach((element) => {
    word +=
      element.length > 2
        ? `${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()} `
        : element + " ";
  });

  return word.trim();
};

export const parseString = (
  string: string,
  style: "up" | "low" | "cap" | "ucf" | null = null,
  force: boolean = true
): string => {
  let noSpecialCharacters = string.replace(/[^a-zA-Z0-9 ]/g, "");
  if (!force) {
    noSpecialCharacters = string.replace(
      /[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9.&,#$\.,@=+*-_() ]/g,
      ""
    );
  }

  if (style === "up") {
    noSpecialCharacters = noSpecialCharacters.toUpperCase();
  } else if (style === "low") {
    noSpecialCharacters = noSpecialCharacters.toLowerCase();
  } else if (style === "cap") {
    noSpecialCharacters = capitalizeWords(noSpecialCharacters);
  } else if (style === "ucf") {
    noSpecialCharacters = capitalize(noSpecialCharacters);
  }

  return noSpecialCharacters.trim();
};

/**
 *
 * @param value
 * @returns
 */
export const isEmailValid = (value: string): boolean => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

/**
 *
 * @param value
 * @returns
 */
export const isPasswordValid = (value: string): boolean => {
  const decimal =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (value.match(decimal)) {
    return true;
  } else {
    return false;
  }
};
