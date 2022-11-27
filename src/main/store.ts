import { Document } from "@shared/types/ipc";
import Store from "electron-store";

interface StoreType {
  documents: Record<string, Document>;
  windowBounds: {
    width: number;
    height: number;
  };
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
    windowBounds: {
      width: 1120,
      height: 700,
    },
  },
});
