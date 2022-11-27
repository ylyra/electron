import { IPC } from "@shared/constants/ipc";
import {
  CreateDocumentResponse,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from "@shared/types/ipc";
import { ipcMain } from "electron";
import { randomUUID } from "node:crypto";
import { store } from "./store";

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (event): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get("documents")),
    };
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, props: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${props.id}`) as Document;
    return {
      data: document,
    };
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID();
    const document: Document = {
      id,
      title: "Untitled",
    };
    store.set(`documents.${id}`, document);

    console.log(document);

    return {
      data: document,
    };
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    });
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: SaveDocumentRequest): Promise<void> => {
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`);
  }
);
