import { useEffect } from "react";

const useIndexedDB = () => {
  const idb =
    window.indexedDB ||
    (window as any).webkitIndexedDB ||
    (window as any).moxIndexedDB ||
    (window as any).shimIndexedDB;
  useEffect(() => {
    const createCollection = () => {
      if (!idb) {
        console.log("Your browser doesn't support IndexedDB");
        return;
      }

      const request = idb.open("juleslab", 1);
        console.log("request", request);

      request.onsuccess = (event: Event) => {
        console.log("event", event);
        console.log("IndexedDB created successfully");
      };

      request.onerror = (event: Event) => {
        console.log("event", event);
        console.log("IndexedDB error occurred");
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("editorData")) {
          db.createObjectStore("editorData", { keyPath: "id" });
        }
      };
    };

    createCollection();
  }, []);

  return null; // You can return any desired value here
};

export default useIndexedDB;
