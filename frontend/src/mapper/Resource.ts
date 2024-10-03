import {CATEGORIES} from "@/data/enum.ts";

export class Resource {
    constructor(
        public id: string,
        public name: string,
        public category: CATEGORIES,
        public createdAt: string,
        public content: string,
        public userId: string,
        public topicId: string,
        public author: string,
    ) {
    }

    static async mapper(response: Response): Promise<[Resource] | undefined> {
        try {
            return await response.json() as [Resource];
        } catch (err) {
            console.error("invalid mapper", err);
        }
    }
}
