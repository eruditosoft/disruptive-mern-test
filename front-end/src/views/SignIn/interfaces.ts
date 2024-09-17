import {ROLE} from "@/data/enum.ts";
import {OnClickButton} from "@/data/Props.ts";

export interface ActionFunctionSignInParams {
    email: string;
    alias?: string;
}

export type ToCallFunction = ({email, alias}: ActionFunctionSignInParams) => void

export interface SignInProps {
    toBack?: () => void;
    toCall?: ToCallFunction;
    closeModal: OnClickButton<string>;
}
export interface User extends ActionFunctionSignInParams{
    id?:string;
    role?: ROLE,
}
export interface UserRegister {
    email:string,
    role: ROLE,
    alias: string
}
