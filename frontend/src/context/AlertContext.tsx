import {createContext, useEffect, useState} from "react";
import {AlertContextValue, ChildrenProps} from "@/data/props.ts";
import {SEVERITY} from "@/data/enum.ts";

const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({children}: ChildrenProps) {
    const [show, setShow] = useState(false);
    const [severity, setSev] = useState<SEVERITY | null>(null);
    const [message, setMessage] = useState("empty");
    const [values, setValues] = useState<Record<string, string | number>>({});
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                reset();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    const reset = () => {
        setShow(false);
        setMessage("empty");
        setSev(null);
        setValues({});
    };
    const setToast = ({
                          id,
                          severity,
                          values,
                      }: {
        id: string;
        severity: SEVERITY;
        values?: Record<string, string | number>;
    }) => {
        setSev(severity);
        setMessage(id);
        if (values && Object.keys(values).length > 0) {
            setValues(values);
        }
        setShow(true);
    };
    return (
        <AlertContext.Provider
            value={{show, message, values, severity, setToast}}
        >
            {children}
        </AlertContext.Provider>
    );
}

export default AlertContext;
