import st from "@/views/Home/components/Resource/styles.module.css";
import labelStyles from "@/styles/label.module.css";
import {BodyResourceProps} from "@/data/Props.ts";

export default function BodyResource({title, category, created, author, children}: BodyResourceProps) {
    return (<div className={st.content_detail}>
                            <span
                                className={`${labelStyles.subtitle} ${labelStyles.text_center} ${st.title} ${labelStyles.text_center}`}>{title}</span>
            <span className={`${labelStyles.label}`}>Categoria: {category}</span>
            <span>Autor: {author}</span>

            <span className={st.margin_bottom_2rem}>Fecha de creacion: {created}</span>
            {children && children}
        </div>
    )
}