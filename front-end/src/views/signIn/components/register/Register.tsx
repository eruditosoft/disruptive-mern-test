import st from "@/views/signIn/styles/styles.module.css";
import labelStyles from "@/styles/label.module.css";
import inputStyles from "@/styles/input.module.css";
import styles from "@/styles/button.module.css";
import {SignInProps} from "@/views/signIn/interfaces.ts";
import useHookRegister from "@/views/signIn/components/register/useHookRegister.ts";

export default function Register({toBack, toCall}: SignInProps) {
    const { toRegister, onChangeAlias, disabled, onChangeEmail } = useHookRegister({toCall});

    return (<div className={st.container_flex}>
        <span className={`${labelStyles.title} ${labelStyles.text_center}`}>Registrarse</span>
        <input name="email_register" onChange={onChangeEmail} placeholder="email"
               className={`${inputStyles.primary_input}`}/>
        <input name="alias" onChange={onChangeAlias} placeholder="alias" className={`${inputStyles.primary_input}`}/>
        <div className={`${st.btn_container}`}>
            <button disabled={disabled} className={`${styles.btn} ${styles.btn_primary}`}
                    onClick={toRegister}> Registrarse
            </button>
        </div>
        <button onClick={toBack} className={styles.btn_link}>Iniciar sesion</button>
    </div>);
}
