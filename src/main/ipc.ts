import { ipcMain } from "electron";

ipcMain.handle("fetch-documents", (event) => {
  return [
    {
      id: "1",
      title: "Document 1",
    },
  ];
});
