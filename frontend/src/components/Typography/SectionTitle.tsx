import {TypographyProps} from "@/data/props.ts";
import {FormattedMessage} from "react-intl";
import styles from "./styles.module.css";

export default function SectionTitle({id}: TypographyProps) {
    return (
        <span className={`${styles.title} ${styles.uppercase} `}>
      <FormattedMessage id={id}/>
    </span>
    );
}
