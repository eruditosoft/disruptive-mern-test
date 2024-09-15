import {MouseEvent, useState} from "react";
import {ActionFunctionParams} from "@/views/signIn/interfaces.ts";

export default function () {
    const [open, setOpen] = useState(false);
    const [isLoginActive, setIsLoginActive] = useState(true);
    const handleClickModal = (event: MouseEvent<HTMLButtonElement>, reason?: string) => {
        event.preventDefault();
        if (!open) {
            setOpen(true);
            return;
        }
        if (!reason || reason !== 'backdropClick')
            setOpen(false);
    }

    const signIn = ({email}: ActionFunctionParams) => {
        console.log(email);
    }
    const register = ({email, alias}: ActionFunctionParams) => {
        console.log(email, alias);
    }

    const onChangeContext = () => {
        setIsLoginActive(!isLoginActive);
    }
    return { handleClickModal, signIn, register, onChangeContext, open, isLoginActive }
}