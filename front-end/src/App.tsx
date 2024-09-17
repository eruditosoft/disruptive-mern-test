import {JSX, useContext} from "react";

import styles from './styles/app.module.css';
import SignIn from "@/views/SignIn/View.tsx";
import Home from "@/views/Home/Home.tsx";
import RootContext from "@/context/RootContext.tsx";
import buttonStyles from '@/styles/button.module.css'
import labelStyles from '@/styles/label.module.css';

export default function App(): JSX.Element {
    const response = useContext(RootContext);
    const className = !response?.user ? styles.header : `${styles.header} ${styles.header_logged}`;
    return (
        <div className={styles.container}>
            <header className={className}>
                <SignIn/>
                {response?.user && <div style={{display: "flex", gap: '2rem'}}>
                    <span className={labelStyles.subtitle}>{response.user.alias.toUpperCase()}</span>
                    <button className={`${buttonStyles.btn_link} ${buttonStyles.btn_logout}`}
                            onClick={response.clearUserData}> Cerrar Sesion
                    </button>
                </div>
                }
            </header>
            <main>
                <Home/>
            </main>
            <footer> EruditosSoft 2024</footer>
        </div>);
}

