import {jwtDecode} from "jwt-decode";
import {UserResponse} from "@/data/props.ts";

export function decodeToken(token: string): UserResponse {
    try {
        const response = jwtDecode(token);
        const {exp, alias, userId, role, email} = response as UserResponse;
        return {alias, userId, exp: expirationTime(exp!), role, email};
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        throw error;
    }
}

const expirationTime = (expiration: number): number => {
    try {
        const expirationTime = new Date(expiration * 1000);
        return (expirationTime.getTime() - new Date().getTime()) / 60000;
    } catch (error) {
        console.error('Error decoding token:', error);
        return 0;
    }
};
