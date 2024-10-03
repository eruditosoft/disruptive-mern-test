import labelStyles from "@/styles/label.module.css";
import st from './styles.module.css';
import Modal from "@/components/Modal/Modal.tsx";
import {ResourceProps} from "@/data/Props.ts";
import {styles} from "@/views/Home/styles/styles.ts";
import SkeletonResource from "@/views/Home/components/Skeleton/SkeletonResource.tsx";
import BodyResource from "@/views/Home/components/Resource/BodyResource.tsx";
import useResourceHook from "@/views/Home/components/Resource/useResourceHook.ts";
import ResourceType from "@/views/Home/components/Resource/ResourceType.tsx";

export default function Resource({title, category, author, created, resource}: ResourceProps) {
    const {open, handleClickModal, content, classes, loading, closeModal} = useResourceHook();
    const onHandleClick = async () => {
        await handleClickModal({category, resource: resource!})
    }
    return (
        <>
            <div role="button" onClick={onHandleClick} className={classes.content}>
                <span className={`${labelStyles.subtitle} ${labelStyles.text_center} ${st.title}`}>{title}</span>
                <span>Categoria: {category}</span>
                <span>Autor: {author}</span>
                <span>Fecha de creacion: {created}</span>
            </div>

            <Modal isOpen={open} onClose={closeModal} styles={styles.modalDetail}>
                <BodyResource title={title} category={category} created={created} author={author}>
                    {loading && <SkeletonResource/>}
                    {content && <ResourceType name={title} content={content} category={category}/>}
                </BodyResource>
            </Modal>
        </>);
}

/*
                        <div className={st.content_detail}>
                            <span
                                className={`${labelStyles.subtitle} ${labelStyles.text_center} ${st.title} ${labelStyles.text_center}`}>{title}</span>
                            <span className={`${labelStyles.label}`}>Categoria: {Category}</span>
                            <span>Autor: {author}</span>

                            <span className={st.margin_bottom_2rem}>Fecha de creacion: {created}</span>
                            { loading  && open && <SkeletonResource />}
                            {Category === CATEGORIES.PDF &&
                                <PdfViewer resource="http://localhost:3202/api/v1/static/source/file.pdf"/>}
                            {resource === CATEGORIES.IMAGE && <img src={resource} alt={title}/> }
                        </div>
 */
