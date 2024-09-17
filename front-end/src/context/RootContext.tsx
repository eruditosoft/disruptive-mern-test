import React, {createContext, useState} from 'react';
import {decodeToken} from "@/helpers/decodeToken.ts";
import {UserContext} from "@/data/Props.ts";

interface RootContextValue {
    user: UserContext | null;
    setUserData: (token: string) => void;
    clearUserData: () => void;
}

const RootContext = createContext<RootContextValue | null>(null);

export const RootProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserContext | null>(() => {
        const actual = sessionStorage.getItem('user');
        if (actual != undefined || actual != null) return JSON.parse(actual as string);
        return null;
    });
    const setUserData = async (token: string) => {
        const {alias, userId, role, email, exp} = decodeToken(token);
        //sessionStorage.setItem('user', JSON.stringify({alias, token, userId, role, exp, email}));
        setUser({alias, token, userId, role, exp, email});
    };

    const clearUserData = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };
    return (
        <RootContext.Provider value={{user, setUserData, clearUserData}}>
            {children}
        </RootContext.Provider>
    );
};

export default RootContext;