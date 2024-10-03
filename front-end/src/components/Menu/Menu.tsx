import {useLocation, useNavigate} from "react-router-dom";
import {componentsRoutes} from "@/Routes/Routes.tsx";
import buttonStyles from "@/styles/button.module.css";
import {useContext} from "react";
import RootContext, {RootContextValue} from "@/context/RootContext.tsx";
import {ROLE} from "@/data/enum.ts";
import {readersUrl} from "@/data/url.ts";

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(RootContext) as RootContextValue;

    const setClassName = (path: string) => {
        if (path === location.pathname) {
            return buttonStyles.btn_selected
        }
        return `${buttonStyles.btn_link} ${buttonStyles.btn_logout}`
    }

    const buttonsMenu = componentsRoutes.map(({name, path}) => {
        if (user?.role === ROLE.ADMIN)
            return (<button
                disabled={location.pathname === path}
                className={setClassName(path)} key={name}
                onClick={() => navigate(path)}>{name}</button>);
        if (readersUrl.includes(path))
            return (<button
                disabled={location.pathname === path}
                className={setClassName(path)} key={name}
                onClick={() => navigate(path)}>{name}</button>);
        return;
    })

    if (user?.role === ROLE.READERS) return <div/>;

    return (<div style={{display: "flex", gap: '1rem'}}>
        {
            buttonsMenu
        }
    </div>);
}
