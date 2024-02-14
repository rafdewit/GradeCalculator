import { BrowserWindow, app } from "electron";

export default class Main {
  private static appWindow: BrowserWindow | null;

  static main() {
    app.on('ready', () => this.onReady());
    app.on('window-all-closed', () => app.quit());
  }

  private static onReady() {
    this.appWindow = new BrowserWindow({
      width: 1000,
      height: 800
    });

    this.appWindow.loadFile('dist/grade-calculator-client/index.html');

    this.appWindow.on('closed', () => this.appWindow = null);
  }
}

Main.main();