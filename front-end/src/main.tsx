import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {RootProvider} from "@/context/RootContext.tsx";
import {ToastProvider} from "@/context/ToastContext.tsx";

createRoot(document.getElementById('root')!).render(
    <RootProvider>
        <ToastProvider>
            <App/>
        </ToastProvider>
    </RootProvider>
)
