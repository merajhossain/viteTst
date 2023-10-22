import { useContext, useEffect, useState } from "react";
import { MainStateContext } from "../context/MainStateContext";

export default function MainContent() {
  const { context, setContext } = useContext<any>(MainStateContext);
  // const [imageData, setImageData] = useState<string[] | null>(null);
  const [imageData, setImageData] = useState<any>(null);
  const [elementData, setElementData] = useState<any>(null);
  const [currentId, setCurrentId] = useState<any>(null);

  useEffect(() => {
    if (context) {
      setCurrentId(context.id);
      setImageData(context.imageData);
      setElementData(context.elements);
    }
  }, [context]);

  return (
    <div
      className="p-5 flex-1 h-screen overflow-auto block"
      style={{ height: "calc(100vh - 7.5rem)" }}
    >
      {imageData ? (
          imageData.map((item: any, index: any) => (
            <div className="w-100 mb-5 shadow-gray-500 shadow-lg">
              <img key={index} src={item} alt={`Image ${index}`} />
            </div>
          ))
        ) : (
          <h1 className="text-center text-3xl">
            Click + Button for Upload PDF
          </h1>
        )}
    </div>
  );
}
