import {FormattedMessage} from "react-intl";
import styles from "./styles.module.css";

export default function NoData() {
    return (
        <span className={`${styles.no_data} ${styles.capitalize}`}>
      <FormattedMessage id="noData"/>
    </span>
    );
}
