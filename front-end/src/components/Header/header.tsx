import {useContext} from 'react';
import SignIn from "@/views/SignIn/View.tsx";
import labelStyles from "@/styles/label.module.css";
import buttonStyles from "@/styles/button.module.css";
import RootContext, {RootContextValue} from "@/context/RootContext.tsx";
import styles from "@/styles/app.module.css";
import Menu from "@/components/Menu/Menu.tsx";

export default function Header() {

    const {user, clearUserData} = useContext(RootContext) as RootContextValue;
    const className = !user ? styles.header : `${styles.header} ${styles.header_logged}`;

    return (<header className={className}>
            {user && <Menu/>}
            <SignIn/>
            {user && <div style={{display: "flex", gap: '2rem'}}>
                <span className={labelStyles.subtitle}>{user?.alias.toUpperCase()}</span>
                <button className={`${buttonStyles.btn_link} ${buttonStyles.btn_logout}`}
                        onClick={clearUserData}> Cerrar Sesion
                </button>
            </div>
            }
        </header>
    );
}
