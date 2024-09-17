import {useContext, useState} from "react";
import labelStyles from "@/styles/label.module.css";
import st from './styles.module.css';
import Modal from "@/components/Modal/Modal.tsx";
import PdfViewer from "@/components/PdfViewer/PdfViewer.tsx";
import RootContext from "@/context/RootContext.tsx";
import {ResourceProps} from "@/data/Props.ts";

export default function Resource({title, category, author, created, resource}: ResourceProps) {
    const root = useContext(RootContext);
    const classes = {
        content: !root?.user ? `${st.content_root}` : `${st.content_root} ${st.content_root_enabled}`
    }
    const [open, setOpen] = useState(false);
    const handleClickModal = () => {
        if (!root?.user) return;
        setOpen(!open)
    }
    return (
        <>
            <div role="button" onClick={handleClickModal} className={classes.content}>
                <span className={`${labelStyles.subtitle} ${labelStyles.text_center} ${st.title}`}>{title}</span>
                <span>Categoria: {category}</span>
                <span>Autor: {author}</span>
                <span>Fecha de creacion: {created}</span>
            </div>
            {
                resource &&
                <>
                    <Modal isOpen={open} onClose={handleClickModal}>
                        <div>
                            <h3>details</h3>
                            { category === "PDF" && <PdfViewer resource="http://localhost:3202/api/v1/static/source/file.pdf" /> }
                            {resource === "IMAGE" && <img src={resource} alt={title} /> }
                        </div>
                    </Modal>
                </>
            }
        </>);
}
