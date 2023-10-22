import { useEffect, useState } from "react";

const useGetAllStoreData = () => {
  const [datas, setDatas] = useState<any[] | null>(null);
    console.log('Ok');
    
  useEffect(() => {
    const fetchData = async () => {
        const dbPromise = window.indexedDB.open("juleslab", 1);
        dbPromise.onsuccess = (event:any) => {
            const db = dbPromise.result;
            const tx = db.transaction('editorData', 'readwrite');
            const userDataStore = tx.objectStore('editorData');
            const all = userDataStore.getAll();
            all.onsuccess = () => {
              const datas = all.result;
              setDatas(datas);
              db.close()              
          }
        }
        dbPromise.onerror = (event) => {
          console.log("adding data error");
        };
    };

    fetchData();
  }, []); // Ensure the effect runs only once

  return datas;
};

export default useGetAllStoreData;
