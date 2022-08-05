import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { statSync, mkdirSync, existsSync } from 'fs';
import { writeFile, appendFile } from 'fs/promises';
import { resolve } from 'path';
import { logTypes } from '../../config/config';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  private maxSize = 1024;
  private logsDirectory = `${process.cwd()}/logs`;
  private file = `log-${Date.now()}`;

  constructor(private configService: ConfigService) {
    super();
    if (!this.isExist(this.logsDirectory)) {
      this.createDirectory();
    }
    this.maxSize = this.configService.get('MAX_FILE_SIZE');
  }

  infoLog(message: string): void {
    this.log(message);
    this.logToFile(message, logTypes.info);
  }

  errorLog(message: string) {
    this.error(message);
    this.logToFile(message, logTypes.error);
  }

  warnLog(message: string) {
    this.warn(message);
    this.logToFile(message, logTypes.warn);
  }

  debugLog(message: string) {
    this.debug(message);
    this.logToFile(message, logTypes.debug);
  }

  verboseLog(message: string) {
    this.verbose(message);
    this.logToFile(message, logTypes.verbose);
  }

  private async logToFile(msg: string, type: logTypes) {
    let path = resolve(`${this.logsDirectory}/${type}-${this.file}.log`);

    if (this.getFileSize(path) > this.maxSize) {
      this.file = `log-${Date.now()}`;
      path = resolve(`${this.logsDirectory}/${type}-${this.file}.log`);
    }

    if (!this.isExist(path)) {
      await writeFile(path, msg, { flag: 'wx', encoding: 'utf-8' });
    } else {
      await appendFile(path, msg, { encoding: 'utf-8' });
    }
  }

  private getFileSize(path: string): number {
    try {
      const stat = statSync(path);
      return stat.size;
    } catch (e) {
      return 0;
    }
  }

  private isExist(path: string): boolean {
    return existsSync(path);
  }

  private createDirectory(): void {
    mkdirSync(this.logsDirectory);
  }
}
