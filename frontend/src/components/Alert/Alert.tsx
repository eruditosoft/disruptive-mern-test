import "./styles.css";
import {FormattedMessage} from "react-intl";
import {useContext} from "react";
import AlertContext from "@/context/AlertContext.tsx";

export default function Alert() {
    const props = useContext(AlertContext);
    const {severity, show, message, values} = props!;
    const className = show ? `toast ${severity} show` : "toast";
    return (
        <div className={className}>
            <FormattedMessage id={message} values={values}/>
        </div>
    );
}
