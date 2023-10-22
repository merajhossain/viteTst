import { useContext, useEffect, useState } from "react";
import useGetAllStoreData from "./useGetAllStoreData";
import { MainStateContext } from "../../context/MainStateContext";

// Define the hook's return type
interface AddDataIndexDBType {
  editorData: any;
  allDatas: any;
}

const useDataStore = (
  editorData: any,
): AddDataIndexDBType | null => {
  const [datas, setDatas] = useState<IDBDatabase | null>(null);
  const [allDatas, setAllDatas] = useState<any>(null);
  const {context, setContext} = useContext<any>(MainStateContext);
  useEffect(() => {
    const addData = async () => {
      const dbPromise = window.indexedDB.open('juleslab', 1);
      dbPromise.onsuccess = (event:any) => {
          const db = dbPromise.result;
          const tx = db.transaction('editorData', 'readwrite');
          const userDataStore = tx.objectStore('editorData');
          const all = userDataStore.getAll();
          all.onsuccess = () => {
            const allEditorData = all.result;
            localStorage.setItem('currentId', String(allEditorData.length + 1));
            const users = userDataStore.put({id: allEditorData.length + 1, title: editorData[0].title, imageData: editorData[0].images, elements: "", });
            users.onsuccess = () => {
              setContext({id: allEditorData.length + 1, title: editorData[0].title, imageData: editorData[0].images, elements: "", })
              const tx = db.transaction('editorData', 'readwrite');
              const userDataStore = tx.objectStore('editorData');
              const all = userDataStore.getAll();
              all.onsuccess = () => {
                console.log('all', all.result);
                setAllDatas(all.result);
                db.close();
              }
            }
            users.onerror = () => {
                tx.oncomplete = () => {
                    db.close();
                }
            }
        }
      }
      dbPromise.onerror = (event) => {
        console.log("adding data error");
      };
    };
    editorData.length > 0 ? addData() : ''

  }, [editorData]);
  return { editorData, allDatas};
};

export default useDataStore;
