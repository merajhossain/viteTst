import { useContext, useEffect, useState } from "react";
import useGetAllStoreData from "./useGetAllStoreData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainStateContext } from "../../context/MainStateContext";

const useDataSpecificData = () => {
  const [datas, setDatas] = useState<IDBDatabase | null>(null);
  const [allDataDelete, setAllDatas] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {context, setContext} = useContext<any>(MainStateContext);

  const getSpecificData = async (id: any) => {
    const dbPromise = window.indexedDB.open("juleslab", 1);
    dbPromise.onsuccess = (event: any) => {
      const db = dbPromise.result;
      const tx = db.transaction("editorData", "readwrite");
      const dataStore = tx.objectStore("editorData");
      const specificData = dataStore.get(id);
      specificData.onsuccess = () => {
        console.log('specificData', specificData.result);
        setContext(specificData.result);
        db.close();
      };
      specificData.onerror = () => {
        // Handle the error here
      };
    };
    dbPromise.onerror = (event) => {
      console.log("deleting data error");
    };
  };

  return { getSpecificData };
};

export default useDataSpecificData;
