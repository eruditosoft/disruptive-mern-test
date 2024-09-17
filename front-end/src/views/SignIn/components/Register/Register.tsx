import st from "@/views/SignIn/styles/styles.module.css";
import labelStyles from "@/styles/label.module.css";
import inputStyles from "@/styles/input.module.css";
import styles from "@/styles/button.module.css";
import {SignInProps} from "@/views/SignIn/interfaces.ts";
import useHookRegister from "@/views/SignIn/components/Register/useHookRegister.ts";
import SkeletonAuth from "@/views/SignIn/components/Skeleton/SkeletonAuth.tsx";
import CheckInput from "@/components/Input/CheckInput.tsx";
import {ROLE} from "@/data/enum.ts";

export default function Register({toBack, closeModal}: SignInProps) {
    const {
        toRegister,
        email,
        alias,
        onChangeAlias,
        disabled,
        onChangeEmail,
        loading,
        handleChangeRole,
        role,
        error,
    } = useHookRegister(closeModal);
    const register = async () => {
        await toRegister({email, alias, role})
    }
    if (loading) return <SkeletonAuth/>
    return (<div className={st.container_flex}>

        <span className={`${labelStyles.title} ${labelStyles.text_center}`}>Registrarse</span>
        <input name="email_register" onChange={onChangeEmail} placeholder="email"
               className={`${inputStyles.primary_input}`}/>
        <input name="alias" onChange={onChangeAlias} placeholder="alias" className={`${inputStyles.primary_input}`}/>
        <div>
            <CheckInput label="Creador" value={ROLE.CREATORS} checked={role === ROLE.CREATORS}
                        onChange={handleChangeRole}/>
            <CheckInput label="Lector" value={ROLE.READERS} checked={role === ROLE.READERS}
                        onChange={handleChangeRole}/>
        </div>
        <div className={`${st.btn_container}`}>
            <button disabled={disabled} className={`${styles.btn} ${styles.btn_primary}`}
                    onClick={register}> Registrarse
            </button>
        </div>
        <button onClick={toBack} className={styles.btn_link}>Iniciar sesion</button>
        {error && <span className={`${labelStyles.error} ${labelStyles.text_right}`}>{error}</span>}
    </div>);
}
