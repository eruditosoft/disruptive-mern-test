import {Levels, Role, SEVERITY} from "@/data/enum.ts";
import {ReactNode} from "react";

export interface UserResponse {
    alias: string;
    email: string;
    exp: number;
    role: Role;
    userId: string;
}

export interface UserContext extends UserResponse {
    token: string;
    permissions: Levels[];
}

export interface KeyValue {
    [key: string]: string | number | boolean | KeyValue;
}

export type TypographyProps = {
    id: string;
    values?: Record<string, string | number>;
};

export interface SessionContextValue {
    user: UserContext | null;
    setData: (token: string) => void;
    clearData: () => void;
}

export interface AlertProps {
    severity: SEVERITY | null;
    message: string;
    values?: Record<string, string | number>;
}

export interface AlertContextValue extends AlertProps {
    show: boolean;
    setToast: ({
                   id,
                   severity,
                   values,
               }: {
        id: string;
        severity: SEVERITY;
        values?: Record<string, string | number>;
    }) => void;
}

export interface ChildrenProps {
    children: ReactNode;
}

export interface ErrorProps {
    message: string;
}
