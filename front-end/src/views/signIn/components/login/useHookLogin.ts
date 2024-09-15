import {ChangeEvent, useState} from "react";
import {isValidEmail} from "@/helpers/validate.ts";
import {SignInProps} from "@/views/signIn/interfaces.ts";

export default function ({toCall}: SignInProps) {
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(true);

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDisabled(!isValidEmail(value))
        setEmail(value);
    }
    const toLogin = () => {
        toCall({email});
    }
    return {
        disabled, onChangeEmail, toLogin
    }
}