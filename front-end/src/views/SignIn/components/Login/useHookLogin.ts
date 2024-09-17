import {ChangeEvent, useCallback, useContext, useState} from "react";
import {isValidEmail} from "@/helpers/validate.ts";
import {login} from "@/views/SignIn/service/login.service.ts";
import RootContext from "@/context/RootContext.tsx";
import ToastContext from "@/context/ToastContext.tsx";
import {OnClickButton} from "@/data/Props.ts";

export default function (closeModal: OnClickButton<string>) {
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {setUserData, user} = useContext(RootContext);

    const {onHandleSeverity, onHandleToast, onHandleMessage} = useContext(ToastContext);

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (error) setError(null);
        setDisabled(!isValidEmail(value))
        setEmail(value);
    }
    const toLogin = useCallback(async (email: string) => {
        try {
            setError(null);
            setLoading(true);
            const response = await login(email);
            await setUserData(response);
            onHandleSeverity('success');
            onHandleMessage(`Bienvenido ${user?.alias ?? email}`);
            closeModal();
        } catch (error) {
            onHandleSeverity('error');
            onHandleMessage(`A ocurrido un error al iniciar sesion ${email}`);
            console.log(error);
            //TODO mejorar los mensajes, se debe crear un custom Error
            setError("A ocurrido un error al iniciar sesion");
            setDisabled(true);
        } finally {
            setLoading(false);
            onHandleToast(true);
        }
    }, [])
    return {
        disabled, onChangeEmail, toLogin, email, error, loading
    }
}