import {KeyValue} from "@/data/props.ts";

export default function (obj: KeyValue, path: string): KeyValue | undefined {
    const pathArray = path.split('.');
    let current = obj;
    for (const key of pathArray) {
        if (current && typeof current[key] !== 'undefined') {
            current = current[key] as KeyValue;
        } else {
            return undefined;
        }
    }
    return current;
}
