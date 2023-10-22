import { useState, useContext, useEffect } from "react";
import { MainStateContext } from "../context/MainStateContext";

export default function Rightbar() {
  const { editorData, setEditorData } = useContext(MainStateContext);
  
  return (
    <>
      <div className="p-4 w-full md:w-1/4 border-s-4">
        <div className="flex item-start justify-start gap-2">
          <div className="p-5 bg-gray-200 w-80">Text</div>
          <div className="p-5 bg-gray-200 w-80">Image</div>
        </div>
      </div>
    </>
  );
}
