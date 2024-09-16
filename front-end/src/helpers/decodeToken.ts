import {jwtDecode} from "jwt-decode";
import {ROLE} from "@/data/enum.ts";
interface TokenResponse  {
    alias: string;
    email: string;
    exp: number;
    role: ROLE,
    user_id: string;
}
export function decodeToken(token: string): unknown {
    try {
        const response = jwtDecode(token);
        const { exp, alias, user_id:userId, role } = response as  TokenResponse;
    return { alias, userId, exp: expirationTime(exp!), role }
} catch (error) {
        console.error('Error al decodificar el token:', error);
    }
}

const expirationTime = (expiration: number): number => {
    try {
        const expirationTime = new Date(expiration * 1000);
        console.log(expirationTime);
        const now = new Date();
        const timeRemaining = (expirationTime.getTime() - now.getTime()) / 60000;
        return timeRemaining;
    } catch (error) {
        console.error('Error decoding token:', error);
        return 0;
    }
};
