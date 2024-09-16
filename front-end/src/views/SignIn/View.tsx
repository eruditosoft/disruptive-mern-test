import {ReactNode, useContext} from "react";
import Modal from "@/components/Modal/Modal.tsx";
import styles from '@/styles/button.module.css';
import st from './styles/styles.module.css';
import Login from "@/views/SignIn/components/Login/Login.tsx";
import Register from "@/views/SignIn/components/Register/Register.tsx";
import useHookSignIn from "@/views/SignIn/useHookSignIn.ts";
import RootContext from "@/context/RootContext.tsx";

export default function SignIn(): ReactNode {
    const {handleClickModal,  onChangeContext, open, isLoginActive, closeModal} = useHookSignIn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const  { user } = useContext(RootContext);
    console.log("USER VIEW", user);
    return (
        <>
            {!user && <div className={st.btn_container}>
                <button name="btn-login" className={`${styles.btn} ${styles.btn_primary}`}
                        onClick={handleClickModal}>Iniciar sesion
                </button>
                <button className={`${styles.btn} ${styles.btn_primary}`} onClick={handleClickModal}>Registrarse
                </button>
            </div>}
            <Modal isOpen={open} onClose={handleClickModal}>
                {isLoginActive ? <Login toBack={onChangeContext} closeModal={closeModal}/>
                    :
                    <Register closeModal={closeModal}  toBack={onChangeContext}/>
                }
            </Modal>
        </>
    )
}