import {ChangeEvent, useState} from "react";

export interface PdfViewerProps {
    resource?: string;
    load?: boolean;
}
export default function ({resource}: PdfViewerProps){

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [source, setSource] = useState(resource);
    const [numPages, setNumPages] = useState<number>(0);
    const onLoad = (e: ChangeEvent<HTMLInputElement>) => {
        setNumPages(0);
        setPageNumber(1);
        const files = e.target?.files;
        const pdf = files && files.length > 0 && files[0];
        const reader = new FileReader();
        reader.readAsDataURL(pdf as Blob);
        reader.onload = () => {
            setSource(reader.result as string);
        };
        reader.onerror = (error) => {
            console.error('Error al leer el archivo:', error);
        };
    }
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    const setPageNext =() => {
        if (numPages > pageNumber) setPageNumber(pageNumber + 1)
    }
    const setPageBack =() => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1)
    }
    return {source, numPages, pageNumber, setPageBack, setPageNext, onDocumentLoadSuccess, onLoad }
}