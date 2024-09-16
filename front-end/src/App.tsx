import {JSX} from "react";

import styles from './styles/app.module.css';
import SignIn from "@/views/SignIn/View.tsx";
import Home from "@/views/Home/Home.tsx";

export default function App():JSX.Element {
    return (
      <div className={ styles.container }>
        <header><SignIn /></header>
        <main>
            <Home />
        </main>
        <footer> EruditosSoft 2024</footer>
      </div> );
  }

