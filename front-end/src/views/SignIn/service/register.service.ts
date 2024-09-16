import {ActionFunctionSignInParams, User, UserRegister} from "@/views/SignIn/interfaces.ts";
import {callFakeApi} from "@/helpers/fakeEndopint.ts";
import endpoints from "@/data/endpoints.ts";
import {HTTP_METHOD} from "@/data/enum.ts";

export async function fakerRegister({email, alias}: ActionFunctionSignInParams): Promise<User> {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await callFakeApi(10000, {email, alias}, false);
        return  response as User;
    }catch (error){
        throw error;
    }
    /*   */
}
export  async function register ({email, alias, role}: UserRegister): Promise<User> {
    try {
        const response = await fetch(endpoints.user, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({alias,email, role})
        });
        return await response.json();
    }catch (err){
        console.log(err);
        throw new Error("errr ")
    }
}