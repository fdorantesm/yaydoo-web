export interface ILogger {
  info (msg: any);
  warn (msg: any);
  error (msg: any);
}

export class Logger implements ILogger {

  info (msg: any) {
    // tslint:disable-next-line:no-console
    console.info(msg);
  }

  warn (msg: any) {
    // tslint:disable-next-line:no-console
    console.warn(msg);
  }

  error (msg: any) {
    // tslint:disable-next-line:no-console
    console.error(msg);
  }

}
