import Routes from "@/routes/Routes.tsx";
import {SessionProvider} from "@/context/SessionContext.tsx";
import {IntlProvider} from "@/intl/context/IntlContext.tsx";
import {AlertProvider} from "@/context/AlertContext.tsx";
import {Alert} from "@/components";

function App() {
    return (
        <SessionProvider>
            <IntlProvider>
                <AlertProvider>
                    <Alert/>
                    <Routes/>
                </AlertProvider>
            </IntlProvider>
        </SessionProvider>
    );
}

export default App;
