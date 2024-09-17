import React, {createContext, useState} from 'react';
import {AlertColor} from "@mui/material/Alert/Alert";

interface ToastContextValue {
    openToast: boolean;
    onHandleToast: (value: boolean) => void;
    severity: AlertColor
    onHandleSeverity: (value: AlertColor) => void;
    onHandleMessage: (value: string) => void;
    message: string;
}

const ToastContext = createContext<ToastContextValue>({
    openToast: false,
    onHandleToast(_: boolean): void {
    },
    onHandleSeverity(_: AlertColor): void {
    },
    onHandleMessage(_: string): void {
    },
    severity: 'success',
    message: '',
});

export const ToastProvider = ({children}: { children: React.ReactNode }) => {
    const [openToast, setOpenToast] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState('');
    const onHandleToast = (value: boolean) => setOpenToast(value);
    const onHandleSeverity = (value: AlertColor) => setSeverity(value);
    const onHandleMessage = (value: string) => setMessage(value);
    return (
        <ToastContext.Provider value={{message, onHandleMessage, openToast, onHandleToast, severity, onHandleSeverity}}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;