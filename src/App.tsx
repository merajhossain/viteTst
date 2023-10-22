import React, { useState, useContext, useEffect } from "react";
import Leftbar from "./components/Leftbar";
import MainContent from "./components/MainContent";
import Rightbar from "./components/Rightbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { MainStateContext, MainStateContextProvider } from "./context/MainStateContext";
import useIndexDbCreate from "./customHooks/indexDB/useIndexDbCreate";

const App: React.FC = () => {
  
  const [db, setDb] = useState<any>("");
  const [store, setStore] = useState<any>("");
  // const {dbName, storeName} = useIndexDbCreate(db, store);

  useEffect(() => {
    setDb('juleslabEsigner');
    setStore('editorData');
  }, [])

  useEffect( () => {
    // console.log('dbName', dbName);
    // console.log('storeName', storeName);
    
  }, [db, store])

  return (
    <>
    <MainStateContextProvider>
      <div className="flex flex-col h-screen">
        {/* <!-- Header --> */}
        <Header />
        {/* <!-- Main Content Area --> */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* <!-- Sidebar --> */}
          <Leftbar />
          {/* <!-- Contentbar --> */}
          <MainContent />
          {/* <!-- Rightbar --> */}
          <Rightbar />
        </div>
        {/* <!-- Footer --> */}
        <Footer />
      </div>
    </MainStateContextProvider>
    </>
  );
}

export default App;
