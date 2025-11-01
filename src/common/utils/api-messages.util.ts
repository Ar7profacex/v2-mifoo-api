/* CLASS-VALIDATOR TRANSLATED MESSAGES */
export const IS_NOT_EMPTY_MSG = `$property no debe ser vacío`;
export const IS_STRING_MSG = `$property debe ser de tipo string`;
export const IS_NUMBER_MSG = '$property debe ser de tipo numérico';
export const IS_ARRAY_MSG = `$property debe ser de un arreglo`;
export const IS_DATE_MSG = `$property debe ser de tipo Fecha (Date)`;
export const IS_BOOLEAN_MSG = `$property debe ser de tipo booleano`;
export const IS_ENUM_MSG = `$property debe ser de tipo enum válido`;
export const IS_OBJECT_MSG = `$property debe ser de tipo objeto`;
export const IS_NOT_EMPTY_OBJECT_MSG = `$property debe ser de tipo objeto y no vacío`;
export const ARRAY_NOT_EMPTY_MSG = `$property debe ser de un arreglo y contener al menos un elemento`;
export const VALIDATE_NESTED_MSG = '$property debe ser un objeto o arreglo';
export const IS_ARRAY_NUMBER_MSG = '$property debe ser un arreglo de numeros';
export const IS_MONTH_MSG = '$property debe ser un número del mes valido';
export const IS_YEAR_LENGTH_MSG = '$property debe ser un numero de Año valido';
export const IS_HOUR_MSG = '$property debe ser de tipo fecha en formato HH:mm';
export const IS_MINOR_DATE = '$property debe ser una fecha mayor a la actual';

/* HTTP EXCEPTIONS TRANSLATED MESSAGES */
export const getNotFoundMsg = (resource: string) =>
  `Recurso ${resource} no encontrado`;

export const getInternalServerErrorMsg = (message: string = undefined) =>
  message ? message : 'Ha ocurrido un error, por favor reintente nuevamente';

export const getIntegerPipeMsg = (data: string) =>
  `El parámetro proporcionado :${data} debe ser un número entero`;

export const getIntegerArrayPipeMsg = (data: any) =>
  `El parámetro proporcionado ${JSON.stringify(
    data,
  )} debe ser un arreglo de números enteros`;

export const getEnumPipeMsg = (data: string, enumStringKeys: [string, any][]) =>
  `El parámetro proporcionado '${data}' debe ser de un tipo válido: ${enumStringKeys.map(
    ([key, value]) => JSON.stringify({ [key]: value }),
  )}`;

export const getArrStringPipeMsg = (data: any) =>
  `El parámetro proporcionado '${data}' debe ser de un arreglo de string`;

export const getArrayPipeMsg = () =>
  `El argumento proporcionado debe ser un arreglo de números enteros`;
