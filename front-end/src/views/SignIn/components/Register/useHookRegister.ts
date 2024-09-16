import {ChangeEvent, useCallback, useState} from "react";
import {isValidEmail} from "@/helpers/validate.ts";
import {UserRegister} from "@/views/SignIn/interfaces.ts";
import {register} from "@/views/SignIn/service/register.service.ts";
import {ROLE} from "@/data/enum.ts";

export default function (closeModal:()=>void) {
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [role, setRole] = useState(ROLE.READERS);

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
    const toRegister = useCallback(async ({alias, email,role}: UserRegister) => {
        try {
            setError(null);
            setLoading(true);
            await register({alias, email,role});
            closeModal();
        } catch (error) {
            setError(error)
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