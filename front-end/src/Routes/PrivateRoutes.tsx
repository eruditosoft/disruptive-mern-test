import RootContext, {RootContextValue} from "@/context/RootContext.tsx";
import {ReactNode, useContext} from "react";
import {ROLE} from "@/data/enum.ts";
import {Navigate} from "react-router-dom";
import {readersUrl} from "@/data/url.ts";

interface Props {
    children: ReactNode;
    path: string;
}

export default function PrivateRoutes({children, path}: Props) {
    const {user} = useContext(RootContext) as RootContextValue;
    if (user?.role === ROLE.ADMIN) return <>{children}</>;
    if (user?.role === ROLE.CREATORS && readersUrl.includes(path))
        return <>{children}</>;
    return <Navigate to="/"/>;
}
