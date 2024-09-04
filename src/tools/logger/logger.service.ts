import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  log(message: string) {
    super.log(message);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }

  subscriber(message: string) {
    const mauveColor = '\x1b[35m'; // Code couleur ANSI pour le mauve
    const resetColor = '\x1b[0m'; // Code pour réinitialiser la couleur
    const yellowColor = '\x1b[33m';
    const processId = process.pid; // ID du processus en cours

    const date = new Date();
    const formattedDate = date
      .toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(',', '');

    const formattedMessage = `${mauveColor}[Nest] ${processId}  - ${resetColor}${formattedDate}     ${mauveColor}SUBSCRIBER ${yellowColor}[${
      this.context || 'Subscriber'
    }] ${mauveColor}${message}${resetColor}`;

    console.log(formattedMessage);
  }
}
