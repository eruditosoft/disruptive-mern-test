import {callFakeApi} from "@/helpers/fakeEndopint.ts";
import endpoints from "@/data/endpoints.ts";
import {HTTP_METHOD} from "@/data/enum.ts";
import {decodeToken} from "@/helpers/decodeToken.ts";

export async function fakerLogin(email: string): Promise<string> {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await callFakeApi(10000, email, false);
        return response as string;
    } catch (error) {
        throw error;
    }
}

export async function login(email: string) {
    try {
        const response = await fetch(endpoints.login, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        const {token} = await response.json();
        return decodeToken(token);
    } catch (err) {
        console.log(err);
        throw new Error("errr ")
    }
}