import { useContext, useMemo } from "react";
import SessionContext from "@/context/SessionContext.tsx";
import styles from "@/components/Resource/styles.module.css";

export default function () {
  const sesion = useContext(SessionContext);
  const className = useMemo(
    () => ({
      content: !sesion?.user
        ? `${styles.content_root}`
        : `${styles.content_root} ${styles.content_root_enabled}`,
    }),
    [sesion],
  );

  return { className };
}
