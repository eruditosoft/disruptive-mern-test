import {ROLE} from '@shared/enum/roles';
import {envs} from './envs';

const endpoints = {
    id: "/:id",
    root: "/",
    findAll: `/find`,
    upload: `${envs.VERSION_API}upload`,
    login: `${envs.VERSION_API}login`,
    static: {
        root: `${envs.VERSION_API}static`,
        get: "/:src/:name"
    },
    user: {
        root: `${envs.VERSION_API}user`,
    },
    category: {
        root: `${envs.VERSION_API}category`,
    },
    resource: {
        root: `${envs.VERSION_API}resource`,
        register: "/:userId/:topicId"
    },
    topic: {
        root: `${envs.VERSION_API}topic`,
    },
    health: `${envs.VERSION_API}health`
};
export default endpoints;
const defaultUrl = [
    endpoints.topic.root, endpoints.resource.root,
    endpoints.category.root, endpoints.topic.root.concat(endpoints.findAll),
    endpoints.resource.root.concat(endpoints.findAll), endpoints.category.root.concat(endpoints.findAll),
    endpoints.topic.root.concat(endpoints.id),
    endpoints.resource.root.concat(endpoints.id), endpoints.category.root.concat(endpoints.id)
]
export const permissions = {
    [ROLE.READERS]: {
        GET: defaultUrl
    },
    [ROLE.CREATORS]: {
        GET: defaultUrl,
        POST: defaultUrl,
        PUT: defaultUrl
    }
};