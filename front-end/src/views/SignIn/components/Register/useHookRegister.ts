import {ChangeEvent, useCallback, useContext, useState} from "react";
import {isValidEmail} from "@/helpers/validate.ts";
import {UserRegister} from "@/views/SignIn/interfaces.ts";
import {register} from "@/views/SignIn/service/register.service.ts";
import {ROLE} from "@/data/enum.ts";
import {OnClickButton} from "@/data/Props.ts";
import useHookLogin from "@/views/SignIn/components/Login/useHookLogin.ts";
import ToastContext from "@/context/ToastContext.tsx";

export default function (closeModal: OnClickButton<string>) {
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [role, setRole] = useState(ROLE.READERS);
    const {toLogin} = useHookLogin(closeModal);
    const {onHandleSeverity, onHandleToast, onHandleMessage} = useContext(ToastContext);
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
    const toRegister = useCallback(async ({alias, email, role}: UserRegister) => {
        try {
            setError(null);
            setLoading(true);
            const response = await register({alias, email, role});
            setDisabled(true);
            if (response?.email) {
                await toLogin(response.email);
                return;
            } else {
                const err = "A ocurrido un erro al registrar el usuario";
                onHandleSeverity('error');
                onHandleMessage(err);
                onHandleToast(true);
                setError(err);
                return;
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);
    const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value as ROLE);
    };
    return {
        disabled, onChangeAlias, onChangeEmail, toRegister, alias, email, loading, error, role, handleChangeRole
    }
}