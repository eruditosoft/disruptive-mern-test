import React, {createContext, useState} from 'react';

interface UserType {
    role: string;
    alias: string;
    id: string;
}

const RootContext = createContext<UserType | null>(null);

export const RootProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(() => {
        const actual = localStorage.getItem('user')
        if (actual) return JSON.parse(actual);
        return null;
    });

    const setUserData = (newUser: UserType) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const clearUserData = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <RootContext.Provider value={{user, setUserData, clearUserData}}>
            {children}
        </RootContext.Provider>
    );
};

export default RootContext;