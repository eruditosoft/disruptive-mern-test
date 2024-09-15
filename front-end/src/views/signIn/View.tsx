import {ReactNode} from "react";
import Modal from "@/components/Modal/Modal.tsx";
import styles from '@/styles/button.module.css';
import st from './styles/styles.module.css';
import Login from "@/views/signIn/components/login/Login.tsx";
import Register from "@/views/signIn/components/register/Register.tsx";
import useHookSignIn from "@/views/signIn/useHookSignIn.ts";

export default function SignIn(): ReactNode {
    const {handleClickModal, signIn, onChangeContext, register, open, isLoginActive} = useHookSignIn();
    return (
        <>
            <div className={st.btn_container}>
                <button className={`${styles.btn} ${styles.btn_primary}`} onClick={handleClickModal}>Iniciar sesion
                </button>
                <button className={`${styles.btn} ${styles.btn_primary}`} onClick={handleClickModal}>Registrarse</button>
            </div>
            <Modal isOpen={open} onClose={handleClickModal}>
                {isLoginActive ? <Login toBack={onChangeContext} toCall={signIn}/>
                    :
                    <Register toCall={register} toBack={onChangeContext}/>
                }
            </Modal>
        </>
    )
}