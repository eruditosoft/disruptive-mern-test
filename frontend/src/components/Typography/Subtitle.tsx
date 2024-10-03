import { TypographyProps } from "@/data/props.ts";
import styles from "@/components/Typography/styles.module.css";
import { FormattedMessage } from "react-intl";

export default function Subtitle({ id }: TypographyProps) {
  return (
    <span className={`${styles.subtitle} ${styles.capitalize} `}>
      <FormattedMessage id={id} />
    </span>
  );
}
