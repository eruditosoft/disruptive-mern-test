import {useCallback, useEffect, useState} from "react";
import {findAllResources} from "@/views/Home/services/resource.service.ts";

export default function () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resources, setResources] = useState([]);
    useEffect(() => {
        const load = async () => await loadResources();
        load();
    }, []);
    const loadResources = useCallback(async () => {
        try {
            setLoading(true);
            const data = await findAllResources();
            if (data.length > 0) {
                setResources(data);
            }
        } catch (error) {
            console.log(error);
            setError("A ocurrido un error al recuperar la informacion de los recursos")
        } finally {
            setLoading(false);
        }
    }, [])
    return {loading, error, resources}
}