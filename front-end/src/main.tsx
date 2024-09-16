import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {RootProvider} from "@/context/RootContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RootProvider>
            <App/>
        </RootProvider>
    </StrictMode>,
)
