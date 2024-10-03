import {KeyValue} from "@/data/props.ts";

enum HTTP_METHOD {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
}

const base = import.meta.env.VITE_APP_URL_SERVICE;
export const endpoints: KeyValue = {
    login: {
        method: HTTP_METHOD.POST,
        isProtected: false,
        url: `${base}login`,
    },
    resource: {
        findResource: {
            url: `${base}resource/find`,
            method: HTTP_METHOD.POST,
            isProtected: false,
        },
    },
};

export interface Mapper<T, U> {
    (value: T): U;
}

export interface UseFetchProps {
    data?: KeyValue;
    endpoint: string;
    headers?: KeyValue;
    initialCall?: boolean;
}
