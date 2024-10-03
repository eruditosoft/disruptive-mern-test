import endpoints from "@/data/endpoints.ts";
import {HTTP_METHOD} from "@/data/enum.ts";

interface FindFileProps {
    src: string;
    token: string;
}

export async function findFile({src,token}: FindFileProps) {
    try {
        const response = await fetch(`${endpoints.loadFile}${src}`, {
            method: HTTP_METHOD.GET,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${token}`
            },
        });
        const resp = await response.blob();
        return URL.createObjectURL(resp);
    } catch (err) {
        console.log(err);
        throw new Error("errr ")
    }
}