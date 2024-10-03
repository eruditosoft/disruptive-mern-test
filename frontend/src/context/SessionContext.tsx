import {createContext, useState} from "react";
import {ChildrenProps, SessionContextValue, UserContext} from "@/data/props.ts";
import {PermissionLevel} from "@/data/constant.ts";
import {decodeToken} from "@/helpers";

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({children}: ChildrenProps) {
    const [user, setUser] = useState<UserContext | null>(() => {
        const actual = sessionStorage.getItem("token");
        if (actual != undefined || actual != null) return getData(actual);
        return null;
    });

    const getData = (token: string): UserContext => {
        const response = decodeToken(token);
        const permissions = PermissionLevel[response.role];
        return {...response, permissions, token};
    };

    const setData = async (token: string) => {
        const {alias, userId, role, email, exp, permissions} = getData(token);
        sessionStorage.setItem("token", token);
        setUser({permissions, alias, token, userId, role, exp, email});
    };

    const clearData = () => {
        setUser(null);
        sessionStorage.removeItem("token");
    };

    return (
        <SessionContext.Provider value={{user, setData, clearData}}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContext;
