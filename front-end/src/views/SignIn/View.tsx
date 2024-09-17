import {ReactNode, useContext} from "react";
import Modal from "@/components/Modal/Modal.tsx";
import styles from '@/styles/button.module.css';
import st from './styles/styles.module.css';
import Login from "@/views/SignIn/components/Login/Login.tsx";
import Register from "@/views/SignIn/components/Register/Register.tsx";
import useHookSignIn from "@/views/SignIn/useHookSignIn.ts";
import RootContext from "@/context/RootContext.tsx";
import ToastContext from "@/context/ToastContext.tsx";
import Toast from "@/components/Toast/Toast.tsx";


export default function SignIn(): ReactNode {
    const {handleClickModal, onChangeContext, open, isLoginActive, closeModal} = useHookSignIn();
    const response = useContext(RootContext);
    const {openToast,onHandleToast,  severity, message } = useContext(ToastContext);
    return (
        <>
        <Toast message={message} open={openToast} setOpen={onHandleToast} severity={severity} />
            {!response?.user && <div className={st.btn_container}>
                <button name="btn-login" className={`${styles.btn} ${styles.btn_primary}`}
                        onClick={handleClickModal}>Iniciar sesion
                </button>
                <button name="btn-register" className={`${styles.btn} ${styles.btn_primary}`} onClick={handleClickModal}>Registrarse
                </button>
            </div>}
        <Modal isOpen={open} onClose={closeModal}>
        {isLoginActive ? <Login toBack={onChangeContext} closeModal={closeModal}/>
            :
            <Register closeModal={closeModal} toBack={onChangeContext}/>
        }
        </Modal>
</>
)
}