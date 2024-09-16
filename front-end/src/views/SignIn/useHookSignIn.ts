import {MouseEvent, useState} from "react";
import {ActionFunctionSignInParams} from "@/views/SignIn/interfaces.ts";

export default function () {
    const [open, setOpen] = useState(false);
    const [isLoginActive, setIsLoginActive] = useState(false);
    const handleClickModal = (event: MouseEvent<HTMLButtonElement>, reason?: string) => {
        event.preventDefault();
        if (!open) {
            setOpen(true);
            return;
        }
        if (!reason || reason !== 'backdropClick')
            setOpen(false);
    }
const  closeModal = () => {
        setOpen(false);
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

    return { handleClickModal, signIn, register, onChangeContext, open, isLoginActive, closeModal }
}