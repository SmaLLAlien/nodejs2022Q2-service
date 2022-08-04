import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  infoLog(message: string): void {
    this.log(message);
  }

  errorLog(message: string) {
    this.error(message);
  }

  warnLog(message: string) {
    this.warn(message);
  }

  debugLog(message: string) {
    this.debug(message);
  }

  verboseLog(message: string) {
    this.verbose(message);
  }
}
