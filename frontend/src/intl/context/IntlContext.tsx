import {createContext, useState} from "react";
import {IntlProvider as IProvider} from "react-intl";

import {LANGUAGE} from "@/data/enum";
import {en, es} from "@/intl/languages";
import {ChildrenProps} from "@/data/props.ts";

interface IntlContextValue {
    language: LANGUAGE;
    setLanguage: (lang: LANGUAGE) => void;
}

interface Message {
    en: {
        [key: string]: string;
    };
    es: {
        [key: string]: string;
    };
}

export const messages: Message = {
    en,
    es,
};
export const IntlContext = createContext<IntlContextValue | null>(null);

export function IntlProvider({children}: ChildrenProps) {
    const [language, setLang] = useState(LANGUAGE.ES);
    const setLanguage = (lang: LANGUAGE) => setLang(lang);
    return (
        <IntlContext.Provider value={{language, setLanguage}}>
            <IProvider
                locale={language}
                messages={messages[language]}
                defaultLocale={LANGUAGE.ES}
            >
                {children}
            </IProvider>
        </IntlContext.Provider>
    );
}

export default IntlContext;
