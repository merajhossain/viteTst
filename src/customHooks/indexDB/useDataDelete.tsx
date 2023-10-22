import { useEffect, useState } from "react";
import useGetAllStoreData from "./useGetAllStoreData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useDataDelete = () => {
  const [datas, setDatas] = useState<IDBDatabase | null>(null);
  const [allDataDelete, setAllDatas] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const deleteData = async (id: any) => {
    const dbPromise = window.indexedDB.open("juleslab", 1);
    dbPromise.onsuccess = (event: any) => {
      const db = dbPromise.result;
      const tx = db.transaction("editorData", "readwrite");
      const dataStore = tx.objectStore("editorData");
      console.log("id", id);
      const deleteData = dataStore.delete(id);
      console.log(deleteData);
      deleteData.onsuccess = () => {
        const tx = db.transaction('editorData', 'readwrite');
        const userDataStore = tx.objectStore('editorData');
        const all = userDataStore.getAll();
        all.onsuccess = () => {
          setAllDatas(all.result);
          setSuccessMessage("Data deleted successfully")
          db.close();
        }
      };
      deleteData.onerror = () => {
        // Handle the error here
      };
    };
    dbPromise.onerror = (event) => {
      console.log("deleting data error");
    };
  };

  return { deleteData, successMessage, allDataDelete };
};

export default useDataDelete;
