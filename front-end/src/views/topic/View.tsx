import {useState} from "react";
import labelStyles from "@/styles/label.module.css";
import st from './styles.module.css';
import Modal from "@/components/Modal/Modal.tsx";
import PdfViewer from "@/views/topic/pdfViewer/PdfViewer.tsx";

export default function Resource() {
    const [disabled, setDisabled] = useState(false);
    const classes = {
        content: disabled ? `${st.content_root}` : `${st.content_root} ${st.content_root_enabled}`
    }
    const [open, setOpen] = useState(false);

    const handleClickModal = () => {
        if (disabled) return;
        setOpen(!open)
    }
    return (
        <><div role="button" onClick={handleClickModal} className={classes.content}>
        <span className={`${labelStyles.title} ${labelStyles.text_center} ${st.title}`}>Recursos</span>
        <span>categoria: Videos</span>
        <span>author: john doe</span>
        <span>Fecha de creacion: 12/12/2023</span>
    </div>
        <>
        <Modal isOpen={open} onClose={handleClickModal}>
            <div>
                <h3>details</h3>
                <PdfViewer   />
            </div>
        </Modal>
        </>
        </>);
}
