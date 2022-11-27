import { BrowserWindow, Menu, nativeImage, Tray } from "electron";
import path from "node:path";

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../../build/icon.png")
  );
  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    {
      label: "Rotion",
      enabled: false,
      click: () => {
        // toggle window
        window.isVisible() ? window.hide() : window.show();
      },
    },
    {
      type: "separator",
    },
    {
      label: "Criar novo documento",
      click: () => {
        window.webContents.send("new-document");
        window.show();
      },
    },
    {
      type: "separator",
    },
    {
      label: "Documentos recentes",
      enabled: false,
    },
    {
      label: "Criar novo documento",
      accelerator: "CommandOrControl+1",
      acceleratorWorksWhenHidden: false,
    },
    {
      type: "separator",
    },
    {
      label: "Sair",
      role: "quit",
    },
  ]);

  tray.setContextMenu(menu);
}
