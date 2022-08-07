import { LogLevel } from '@nestjs/common';

const levels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
export const getLogLevels = (envLevel = levels.length - 1): LogLevel[] => {
  const level = envLevel > levels.length - 1 ? levels.length - 1 : envLevel;

  const appLogLevels = [...levels];
  appLogLevels.length = level;

  return appLogLevels;
};
