import {CATEGORIES} from '@shared/enum/categories';
import {StringAny} from '@shared/domain/KeyValue';
import {z} from 'zod';

export const topicRegisterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name not valid"
    }).min(3, 'min length 3')
        .max(20, 'max length is 20'),
    categories: z.array(
        z.nativeEnum(CATEGORIES),
        {
            required_error: 'Category is required.',
            invalid_type_error: 'Category must be an array of enum Category'
        }
    ),
    image: z.string(),

});

export class TopicRegisterDto {
    private constructor(public categories: [CATEGORIES],
                        public name: string, public image: string) {
    }

    static createTopicDto(input: StringAny): [string?, TopicRegisterDto?] {
        const {name, categories, image} = input;
        const validate = topicRegisterSchema.safeParse(input);
        if (validate.error) return [validate.error.message];
        return [undefined, new TopicRegisterDto(categories, name, image)];
    }
}
