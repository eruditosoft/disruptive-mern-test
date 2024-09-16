import {ChangeEvent, useCallback, useContext, useState} from "react";
import {isValidEmail} from "@/helpers/validate.ts";
import {SignInProps} from "@/views/SignIn/interfaces.ts";
import {login} from "@/views/SignIn/service/login.service.ts";
import RootContext from "@/context/RootContext.tsx";

export default function ({closeModal}: SignInProps) {
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const  { user, setUserData } = useContext(RootContext);
    console.log("USER HOOk", user);
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDisabled(!isValidEmail(value))
        setEmail(value);
    }
    const toLogin = useCallback(async (email:string) => {
        try {
            setError(null);
            setLoading(true);
            const response = await login(email);
               setUserData(response);
            closeModal();
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    },[])
    return {
        disabled, onChangeEmail, toLogin, email
    }
}