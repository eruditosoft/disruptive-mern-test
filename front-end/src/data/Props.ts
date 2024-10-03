import React, {MouseEvent} from "react";
import {CATEGORIES, ROLE} from "@/data/enum.ts";

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

export interface BodyResourceProps {
    title: string;
    category: CATEGORIES;
    created: string;
    loading?: boolean;
    author: string;
    children?: React.ReactNode;
    open?:boolean;
}

export interface ResourceProps extends BodyResourceProps{
    resource?: string;
    id: string;
    topicId: string;
}
