import {callFakeApi} from "@/helpers/fakeEndopint.ts";
import endpoints from "@/data/endpoints.ts";
import {HTTP_METHOD} from "@/data/enum.ts";
import data from '@/mock/resource.json';

export async function fakerResource(): Promise<[]> {
    // eslint-disable-next-line no-useless-catch
    try {
        await callFakeApi(3000,'', false);
        return data?.items as [];
    } catch (error) {
        throw error;
    }
}

export async function findAllResources() {
    try {
        const response = await fetch(`${endpoints.resource}/find`, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        throw new Error("errr ")
    }
}