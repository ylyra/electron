import { app, BrowserWindow, globalShortcut } from "electron";

export function createShortcuts(window: BrowserWindow) {
  app.on("browser-window-focus", () => {
    globalShortcut.register("CommandOrControl+N", () => {
      if (window.isVisible()) {
        window.webContents.send("new-document");
        window.show();
      }
    });
  });

  app.on("browser-window-blur", () => {
    globalShortcut.unregisterAll();
  });
}
