import {ObjectId} from "mongodb";
import {z} from "zod";
import {StringAny} from "@shared/domain/KeyValue";
import {CATEGORIES} from "@shared/enum/categories";

const commonScheme = z.object({
    name: z.string({
        invalid_type_error: "Invalid format name"
    }).min(3, 'min length 3')
        .max(20, 'max length is 20'),
    content: z.string(),
    type: z.nativeEnum(CATEGORIES)

});

export class CommonDto {
    static validateId = (id: string): boolean => ObjectId.isValid(id);
    static validatePartialUpdate = (input: StringAny): string | undefined => {
        const {name, content, type} = input;
        const validate = commonScheme.partial().safeParse({name, content, type});
        if (validate.error) return validate.error.message;
        return undefined;
    }
}