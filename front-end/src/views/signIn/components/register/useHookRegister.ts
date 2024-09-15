import {ChangeEvent, useState} from "react";
import {isValidEmail} from "@/helpers/validate.ts";
import {SignInProps} from "@/views/signIn/interfaces.ts";

export default function ({toCall}: SignInProps){
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [disabled, setDisabled] = useState(true);

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDisabled(!(isValidEmail(value) && alias.length > 3))
        setEmail(value);
    }
    const onChangeAlias = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDisabled(!(isValidEmail(email) && value.length > 3))
        setAlias(value);
    }
    const toRegister = () => {
        toCall({email, alias});
    }

    return {
         disabled, onChangeAlias, onChangeEmail, toRegister
    }
}