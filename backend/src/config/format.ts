import {format} from "date-fns";
import {envs} from "@config/envs";

export class Format {
    static formatDateOnSave = (createdAt: number) => format(new Date(createdAt), envs.FORMAT_DATE);

}