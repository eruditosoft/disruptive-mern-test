import { envs } from '@src/config/envs';
import { LoggerOptions } from 'pino';

const config: LoggerOptions = {
  name: envs.APP_NAME,
  timestamp: () => `,"time":"${ new Date( Date.now() ).toISOString() }"`,

  customLevels: "debug",
  transport: {
    targets: [
      {
        target: "pino/file",
        options: { destination: envs.logger.PINO_PATH_LOG, mkdir: true },
      },
      {
        target: "pino-pretty",
        options: { destination: process.stdout.fd, colorizerFactory: true },
      },
    ],
  },
};
export default config;
