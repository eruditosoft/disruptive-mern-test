import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useHookPdf, {PdfViewerProps} from "@/views/topic/pdfViewer/useHookPdf.ts";
import stylesButton from '@/styles/button.module.css';
import st from './pdfViewer.module.css';

import {FileDownload} from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PdfViewer({file, load}: PdfViewerProps) {
    const {source, numPages, pageNumber, setPageNext, setPageBack, onLoad, onDocumentLoadSuccess} = useHookPdf({file});
    return (
        <div>
            {load && <label htmlFor="file-input" className={st.input_load_label}>
                <span className={stylesButton.btn_link}>Cargar Archivo</span>
                <FileDownload color="success"/>
                <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={onLoad}
                />
            </label>}
            {source &&
                <>
                    <Document file={source} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber}/>
                    </Document>
                    {numPages !== 1 &&
                        <div className={st.control}>
                            <span>
                        Pagina {pageNumber} de {numPages}
                            </span>
                            <div>
                                <button className={stylesButton.btn_link} disabled={1 === pageNumber}
                                        onClick={setPageBack}>anterior
                                </button>
                                <button className={stylesButton.btn_link} disabled={numPages === pageNumber}
                                        onClick={setPageNext}>siguiente
                                </button>
                            </div>

                        </div>
                    }
                </>
            }
        </div>
    );
}