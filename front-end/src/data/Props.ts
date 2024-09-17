import {MouseEvent} from "react";
import {ROLE} from "@/data/enum.ts";

export type  OnClickButton<T> = (event: MouseEvent<HTMLButtonElement>, data?: T) => void;

export interface DefaultError {
    message: string;
}
export interface UserResponse  {
    alias: string;
    email: string;
    exp: number;
    role: ROLE,
    userId: string;
}

export interface UserContext extends  UserResponse{
    token: string;
}
export interface ResourceProps {
    title: string;
    category: string;
    author: string;
    created: string;
    resource?: string;
}