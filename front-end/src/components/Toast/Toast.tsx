import {Alert, Snackbar} from "@mui/material";
import {SyntheticEvent} from "react";
import {AlertColor} from "@mui/material/Alert/Alert";
import styles from "@/components/Toast/styles.ts";


export type ToastProps = {
    message: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    severity: AlertColor
}

export default function Toast({open, setOpen, message, severity='success'}: ToastProps) {
    const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (<Snackbar
    open={open}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    autoHideDuration={2500}
    >
    <Alert onClose={handleClose} severity={severity} sx={styles}>
        {message}
    </Alert>
    </Snackbar>);
}
