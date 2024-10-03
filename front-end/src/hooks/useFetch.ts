import {useCallback, useContext, useEffect, useState} from 'react';
import {HTTP_METHOD} from "@/data/enum.ts";
import RootContext from "@/context/RootContext.tsx";

interface KeyValues {
    [key: string]: string | number | KeyValues;
}

interface UseFetchProps {
    call: boolean;
    isProtected: boolean;
    headers?: HeadersInit;
    method: HTTP_METHOD;
    body?: KeyValues;
}

function useFetch({isProtected = false, headers, method, body}: UseFetchProps) {
    const [data, setData] = useState<Response | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);
    const [call, setCall] = useState(false);
    const userContext = useContext(RootContext);
    const localHeaders = () => {
        let local: HeadersInit = {
            'Content-Type': 'application/json',
        }
        if (isProtected) {
            local = {
                ...localHeaders,
                authorization: `bearer ${userContext?.user?.token}`
            }
        }
        if (headers) {
            local = {
                ...localHeaders,
                ...headers,
            }
        }
        return local;
    }

    const fetchData = useCallback(async (signal: AbortSignal) => {
        setLoading(true);
        try {
            const response = await fetch('https://api.example.com/data', {
                signal,
                method,
                body: body ? JSON.stringify(body) : null,
                headers: localHeaders()
            });
            if (!response.ok) {
                const r = await response.json();
                console.log(r);
                setError('Network response was not ok');
                return;
            }
            setData(response);
            return;
        } catch
            (error) {
            setError(error);
        } finally {
            setCall(false);
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (call) {
            const controller = new AbortController();
            const signal = controller.signal;
            fetchData(signal);
            return () => {
                controller.abort();
            };
        }
    }, [call]);

    const onSetCall = (value: boolean) => setCall(value);
    return {data, loading, error, onSetCall};
}

export default useFetch;
