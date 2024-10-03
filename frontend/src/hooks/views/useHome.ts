import {useEffect, useState} from "react";
import {Resource} from "@/mapper/Resource.ts";

export default function (response: Response) {
    const [data, setData] = useState<[Resource] | null>();
    useEffect(() => {
        if (response) {
            (async () => {
                try {
                    const result = await Resource.mapper(response);
                    setData(result);
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [response]);

    return {data};
}
