import { useEffect, useState, useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDataDelete from "../customHooks/indexDB/useDataDelete";
import useDataStore from "../customHooks/indexDB/useDataStore";
import useGetAllStoreData from "../customHooks/indexDB/useGetAllStoreData";
import useIndexedDB from "../customHooks/indexDB/useIndexDbCreate";
import usePdfUpload from "../customHooks/usePdfUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainStateContext } from "../context/MainStateContext";
import Swal from 'sweetalert2';
import useDataSpecificData from "../customHooks/indexDB/useDataSpecificData";

const Leftbar: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageStoreData, setImageStoreData] = useState<any>("");
  const { imagesData } = usePdfUpload(pdfUrl);
  const { editorData, allDatas } = useDataStore(imageStoreData);
  const [allData, setAllData] = useState<any>();
  const [fileName, setFileName] = useState<string>("");
  const [uploadFilesLength, setUploadFilesLength] = useState<number>(0);
  const { deleteData, successMessage, allDataDelete } = useDataDelete();
  const { getSpecificData } = useDataSpecificData();
  const {context, setContext} = useContext<any>(MainStateContext);

  useIndexedDB();

  const uploadfileHandle = (event: any) => {
    const files: any = event.target.files;
    if (files.length > 0) {
      let url = URL.createObjectURL(files[0]);
      setFileName(files[0]?.name);
      setPdfUrl(url);
    }
  };

  const getAllData: any = useGetAllStoreData();

  useEffect(() => {
    setAllData(getAllData);
    setUploadFilesLength(getAllData?.length);
  }, [getAllData]);

  useEffect(() => {
    if (imagesData.length > 0) {
      let data:any =[{
        title: fileName ? fileName : "",
        images: imagesData ? imagesData : null,
        elements: null,
    }];
      setImageStoreData(data);
    }
  }, [imagesData]);

  useEffect(() => {
    setUploadFilesLength(allDatas?.length);
    setAllData(allDatas);
  }, [allDatas, allDataDelete]);

  useEffect(() => {
    setUploadFilesLength(allDataDelete?.length);
    setAllData(allDataDelete);
  }, [allDataDelete]);

  const deleteHandler = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let currentId = localStorage.getItem('currentId');
        if (currentId == id) {
          setContext({});
        }
        deleteData(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  const showEditorDataInEditor = (id: any) => {
    getSpecificData(id);
  }

  return (
    <>
      <div className="w-full md:w-1/4 border-e-4">
        <div className="bg-gray-200 w-100 p-1 flex flex-1 items-center justify-between">
          <h4 className="text-base text-dark">
            Documents <span>({uploadFilesLength})</span>
          </h4>
          {/* upload button start */}
          <label
            title="Upload PDF file"
            htmlFor="file-upload"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={(e) => uploadfileHandle(e)}
            />
          </label>
          {/* upload button end */}
        </div>
        <div
          className="p-2 h-screen overflow-y-auto"
          style={{ height: "calc(100vh - 10rem)" }}
        >
          <ul className="list-decimal">
            {allData?.map((item: any, index: any) => (
              <li
                key={index}
                className="flex items-center justify-between border-spacing-2 bg-gray-50 p-2 mb-1"
              >
                <div 
                  className="truncate w-1/2" 
                  title={item?.title}>{item?.title}
                </div>
                <div className="space-x-2">
                  <button 
                    onClick={() => showEditorDataInEditor(item.id)}
                    className="bg-blue-500 text-white py-1 px-2 hover:bg-blue-700">
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                  <button
                    onClick={() => deleteHandler(item.id)}
                    className="bg-red-500 text-white py-1 px-2 hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Leftbar;
