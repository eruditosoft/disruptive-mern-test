import {CATEGORIES} from "@/data/enum.ts";
import PdfViewer from "@/components/PdfViewer/PdfViewer.tsx";
import styles from './styles.module.css';
import buttonStyles from '@/styles/button.module.css';

interface ResourceTypeProps {
    content: string | unknown;
    category: CATEGORIES;
    name: string;
}

export default function ResourceType({content, category, name}: ResourceTypeProps) {

    if (category === CATEGORIES.PDF)
        return <PdfViewer resource={content as string} load={true}/>

    if (category === CATEGORIES.IMAGE)
        return <img className={styles.content_detail_resource} alt={name} src={content as string}/>

    if (category === CATEGORIES.VIDEO)
        return (
            <video className={styles.content_detail_resource} src={content as string} controls/>
        );

    if (category === CATEGORIES.URL)
        return (
            <a
                className={buttonStyles.btn_link}
                href={content as string}
                target="_blank"
                rel="noopener noreferrer"
            >
                {name}</a>)

    return (
        <p className={styles.content_detail_resource_p}>{content as string}</p>);
}
