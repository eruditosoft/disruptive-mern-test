import {Levels, Role} from "@/data/enum.ts";

export const PermissionLevel = {
    [Role.ADMIN]: [Levels.PUBLIC, Levels.PROTECTED, Levels.PRIVATE],
    [Role.READERS]: [Levels.PUBLIC],
    [Role.CREATORS]: [Levels.PUBLIC, Levels.PROTECTED],
}
