import { ROLE } from '@shared/enum/roles';
import { envs } from './envs';

export default {
  id: "/:id",
  root: "/",
  user: {
    root: `${ envs.VERSION_API }user`,
    login: "/login",
  },
  category: {
    root: `${ envs.VERSION_API }category`,
    findAll: `/find`,
  },
  resource: {
    root: `${ envs.VERSION_API }resource`,
    findAll: "/find",
    register: "/:userId/:topicId"
  },
  topic: {
    root: `${ envs.VERSION_API }topic`,
    findAll: `/find`,
  },
  health: `${ envs.VERSION_API }health`
};

export const permissions = {
  [ ROLE.READERS ]: [

  ]

};