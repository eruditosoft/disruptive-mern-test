import {MouseEvent, useCallback, useContext, useMemo, useState} from "react";
import RootContext from "@/context/RootContext.tsx";
import st from "@/views/Home/components/Resource/styles.module.css";
import {CATEGORIES} from "@/data/enum.ts";
import {findFile} from "@/service/find.file.service.ts";

interface HookResourceProps {
    category: CATEGORIES;
    resource: string;
}

export default function () {
    const root = useContext(RootContext);
    const classes = useMemo(() => ({
        content: !root?.user ? `${st.content_root}` : `${st.content_root} ${st.content_root_enabled}`
    }), [root]);

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);
    const handleClickModal = useCallback(async ({category, resource}: HookResourceProps) => {
        if (!root?.user) return;
        setOpen(true);
        try {
            const complements = [CATEGORIES.URL, CATEGORIES.TEXT];
            if (complements.includes(category)) {
                setContent(resource);
                return;
            }
            const values = Object.keys(CATEGORIES).filter((x) => !complements.includes(x as CATEGORIES));
            if (values.includes(category)) {
                const res = await findFile({token: root.user.token, src: resource});
                setContent(res);
                return;
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }

    }, [root]);
    const closeModal = (_e: MouseEvent<HTMLButtonElement>, reason?: string) => {
        if (!reason || reason !== 'backdropClick') {
            setOpen(false);
        }
    }
    return {open, handleClickModal, content, classes, loading, closeModal}
}