export default interface KeyValue {
  [ key: string ]: string | number | KeyValue;
}

export interface StringAny {
  [ key: string ]: string | any;
}
