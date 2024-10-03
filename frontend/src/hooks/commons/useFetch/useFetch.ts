import {useContext, useEffect, useState} from "react";
import SessionContext from "@/context/SessionContext.tsx";
import {endpoints, UseFetchProps} from "@/hooks/commons/useFetch/data.ts";
import getObjectByKey from "@/helpers/getObjectByKey.ts";
import {AlertContextValue, ErrorProps, SessionContextValue,} from "@/data/props.ts";
import AlertContext from "@/context/AlertContext.tsx";
import {SEVERITY} from "@/data/enum.ts";
import {useIntl} from "react-intl";

export default function ({
                             endpoint,
                             data,
                             headers,
                             initialCall,
                         }: UseFetchProps) {
    const [initial, setInitial] = useState(initialCall);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<Response | null>(null);
    const {messages} = useIntl();
    const {setToast} = useContext(AlertContext) as AlertContextValue;
    const sessionContext = useContext(SessionContext) as SessionContextValue;
    const user = sessionContext?.user;

    useEffect(() => {
        if (initial) {
            call();
            setInitial(false);
        }
    }, []);

    const setHeaders = (isProtected: boolean) => {
        let customHeaders = {};
        if (headers) customHeaders = {...headers};
        if (isProtected)
            customHeaders = {
                ...customHeaders,
                authorization: "bearer " + user?.token,
            };

        return {"Content-Type": "application/json", ...customHeaders};
    };

    async function call() {
        const rest = getObjectByKey(endpoints, endpoint);
        const {method, url, isProtected} = rest!;
        const headers = setHeaders(isProtected as boolean);
        const dataCall = data
            ? {
                method,
                headers,
                body: JSON.stringify(data),
            }
            : {
                method,
                headers,
            };
        try {
            setLoading(true);
            const resp = await fetch(url as string, dataCall as RequestInit);
            if (!resp.ok) {
                const {message} = (await resp.json()) as ErrorProps;
                if (!Object.keys(messages).includes(message))
                    setToast({id: "error.server", severity: SEVERITY.ERROR});
                else setToast({id: message, severity: SEVERITY.ERROR});
                setError(message);
                return;
            }
            setResponse(resp);
            return resp;
        } catch (err) {
            setError(err as string);
            setToast({id: "error.server", severity: SEVERITY.ERROR});
        } finally {
            setLoading(false);
        }
    }

    return {response, loading, error};
}
