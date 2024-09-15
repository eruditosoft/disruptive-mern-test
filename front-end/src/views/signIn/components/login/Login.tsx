import st from "@/views/signIn/styles/styles.module.css";
import labelStyles from "@/styles/label.module.css";
import inputStyles from "@/styles/input.module.css";
import styles from "@/styles/button.module.css";
import {SignInProps} from "@/views/signIn/interfaces.ts";
import useHookLogin from "@/views/signIn/components/login/useHookLogin.ts";

export default function Login({toBack, toCall}: SignInProps) {
        const {onChangeEmail, disabled, toLogin } = useHookLogin({toCall});

    return (
        <div className={st.container_flex}>
            <span className={`${labelStyles.title} ${labelStyles.text_center}`}>Iniciar sesion</span>
            <input name="email_login" onChange={onChangeEmail} placeholder="email" className={`${inputStyles.primary_input}`}/>
            <div className={`${st.btn_container}`}>
                <button disabled={disabled} className={`${styles.btn} ${styles.btn_primary}`}
                        onClick={toLogin}>Iniciar
                    sesion
                </button>
            </div>
            <button onClick={toBack} className={styles.btn_link}>Registrarse</button>
        </div>
    );
}
