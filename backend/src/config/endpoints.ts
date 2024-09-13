import { ROLE } from '@src/shared/enum/roles';
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
  health: `${ envs.VERSION_API }health`
};

export const permissions = {
  [ROLE.READERS]: [
    
  ]
  
}