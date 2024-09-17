import {MouseEvent, useCallback, useState} from "react";
import {ActionFunctionSignInParams} from "@/views/SignIn/interfaces.ts";

export default function () {
    const [open, setOpen] = useState(false);
    const [isLoginActive, setIsLoginActive] = useState(true);
    const handleClickModal = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const buttonName = (event.target as HTMLButtonElement).name;
        setOpen(true);
        if (buttonName === 'btn-login')
            setIsLoginActive(true);
        else if (buttonName === 'btn-register') {
            setIsLoginActive(false);

        }
    }, []);
    const closeModal = (_e: MouseEvent<HTMLButtonElement>, reason?: string) => {
        if (!reason || reason !== 'backdropClick') {
            setOpen(false);
        }
    }

    const signIn = ({email}: ActionFunctionSignInParams) => {
        console.log(email);
    }
    const register = ({email, alias}: ActionFunctionSignInParams) => {
        console.log(email, alias);
    }

    const onChangeContext = () => {
        setIsLoginActive(!isLoginActive);
    }

    return {handleClickModal, signIn, register, onChangeContext, open, isLoginActive, closeModal}
}