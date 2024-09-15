import {MouseEvent} from "react";

export type  OnClickButton<T> =  (event: MouseEvent<HTMLButtonElement>, data?:T) => void;
