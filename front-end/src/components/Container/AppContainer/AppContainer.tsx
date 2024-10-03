import styles from "@/styles/app.module.css";
import Header from "@/components/Header/header.tsx";
import {ReactNode} from "react";

export type AppContainerProps = {
    children: ReactNode;
}

export default function AppContainer({children}: AppContainerProps) {
    return (
        <div className={styles.container}>
            <Header/>
            <main>
                {children}
            </main>
            <footer> EruditosSoft 2024</footer>
        </div>);
}
