import {JSX} from "react";

import styles from './styles/app.module.css';
import GridContainer from '@/components/Container/GridContainer';
import SignIn from "@/views/signIn/View.tsx";
import Resource from "@/views/topic/View.tsx";

export default function App():JSX.Element {
    return (
      <div className={ styles.container }>
        <header><SignIn /></header>
        <main>
          <GridContainer>
              <Resource />
              <Resource />
              <Resource />
              <Resource />
          </GridContainer>
        </main>
        <footer> EruditosSoft 2024</footer>
      </div> );
  }

