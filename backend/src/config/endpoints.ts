import { envs } from './envs';

export default {
  user: {
    root: `${ envs.VERSION_API }user`
  },
  health: `${ envs.VERSION_API }health`
};